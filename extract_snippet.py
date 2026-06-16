import json
import codecs

with codecs.open('dump.txt', 'w', 'utf-8') as out:
    with codecs.open('C:\\Users\\jenit\\.gemini\\antigravity-ide\\brain\\4794afc0-0998-4ead-8b47-ee5d804ff3ce\\.system_generated\\logs\\transcript.jsonl', 'r', 'utf-8') as f:
        for line in f:
            obj = json.loads(line)
            content = obj.get('content', '')
            if 'CREDIT_BREAKPOINTS' in content:
                out.write(content + '\n---\n')
