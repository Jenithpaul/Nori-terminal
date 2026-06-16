import { useEffect, useRef } from "react";

/**
 * Silk Background — A flowing, animated purple silk/fabric effect
 * rendered via WebGL shaders. Inspired by the premium silk texture
 * with deep purple/violet tones and smooth wave-like motion.
 */
export function SilkBackground({ opacity = 0.85 }: { opacity?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { alpha: true, antialias: false });
    if (!gl) return;

    // Vertex shader
    const vsSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // Fragment shader — silk/fabric wave effect
    const fsSource = `
      precision mediump float;
      uniform vec2 u_resolution;
      uniform float u_time;

      // Simplex-like noise
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec2 mod289v2(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                           -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy));
        vec2 x0 = v - i + dot(i, C.xx);
        vec2 i1;
        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289v2(i);
        vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m;
        m = m*m;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
        vec3 g;
        g.x = a0.x * x0.x + h.x * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        
        // Aspect ratio correction
        float aspect = u_resolution.x / u_resolution.y;
        vec2 p = uv;
        p.x *= aspect;
        
        float t = u_time * 0.15;
        
        // Multiple layers of flowing noise for silk folds
        float n1 = snoise(vec2(p.x * 1.5 + t * 0.3, p.y * 2.0 - t * 0.2));
        float n2 = snoise(vec2(p.x * 2.5 - t * 0.15, p.y * 3.0 + t * 0.25));
        float n3 = snoise(vec2(p.x * 0.8 + t * 0.1, p.y * 1.2 - t * 0.35));
        float n4 = snoise(vec2(p.x * 3.5 + n1 * 0.3, p.y * 4.0 + n2 * 0.2 - t * 0.1));
        
        // Combine for silk-like folds
        float silk = n1 * 0.4 + n2 * 0.3 + n3 * 0.2 + n4 * 0.1;
        
        // Diagonal flow direction (like draped fabric)
        float diagonal = (uv.x + uv.y) * 2.0;
        float wave = sin(diagonal * 3.14159 + t + silk * 2.0) * 0.5 + 0.5;
        float wave2 = sin(diagonal * 2.0 - t * 0.7 + n2 * 1.5) * 0.5 + 0.5;
        
        // Combine waves for fabric fold effect
        float folds = mix(wave, wave2, 0.4) * 0.7 + silk * 0.3;
        folds = smoothstep(0.0, 1.0, folds);
        
        // Deep glowing purple color palette based on #a855f7
        vec3 darkPurple = vec3(0.04, 0.01, 0.08);
        vec3 midPurple = vec3(0.16, 0.05, 0.28);
        vec3 brightPurple = vec3(0.45, 0.15, 0.75);
        vec3 highlight = vec3(0.66, 0.33, 0.97);
        
        // Color mapping based on fold intensity
        vec3 color;
        if (folds < 0.3) {
          color = mix(darkPurple, midPurple, folds / 0.3);
        } else if (folds < 0.6) {
          color = mix(midPurple, brightPurple, (folds - 0.3) / 0.3);
        } else {
          color = mix(brightPurple, highlight, (folds - 0.6) / 0.4);
        }
        
        // Add specular-like highlights on fold peaks
        float spec = pow(max(folds, 0.0), 3.0) * 0.4;
        color += vec3(spec * 0.5, spec * 0.2, spec * 0.8);
        
        // Subtle grain/texture
        float grain = (snoise(gl_FragCoord.xy * 0.5) * 0.5 + 0.5) * 0.03;
        color += grain;
        
        // Vignette
        float vig = 1.0 - length((uv - 0.5) * 1.3);
        vig = smoothstep(0.0, 0.7, vig);
        color *= vig * 0.9 + 0.1;
        
        gl_FragColor = vec4(color, 1.0);
      }
    `;

    function createShader(gl: WebGLRenderingContext, type: number, source: string) {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vs = createShader(gl, gl.VERTEX_SHADER, vsSource);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Full-screen quad
    const posBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );

    const posLoc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const resLoc = gl.getUniformLocation(program, "u_resolution");
    const timeLoc = gl.getUniformLocation(program, "u_time");

    function resize() {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio, 1.5); // Cap DPR for performance
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      gl!.viewport(0, 0, canvas.width, canvas.height);
    }

    resize();
    window.addEventListener("resize", resize);

    const startTime = performance.now();

    function render() {
      if (!gl || !canvas) return;
      const elapsed = (performance.now() - startTime) / 1000;
      gl.uniform2f(resLoc, canvas.width, canvas.height);
      gl.uniform1f(timeLoc, elapsed);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animRef.current = requestAnimationFrame(render);
    }

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animRef.current);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(posBuffer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 w-full h-full"
      style={{ opacity }}
    />
  );
}
