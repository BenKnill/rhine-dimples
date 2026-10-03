#!/usr/bin/env python3
"""Statically audit an extracted rehearsal kit. This does not execute a browser."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import argparse, json, re

p=argparse.ArgumentParser(description=__doc__);p.add_argument('directory',type=Path,nargs='?',default=Path(__file__).resolve().parent);a=p.parse_args();root=a.directory.resolve()
errors=[];pages=0;script_files=set();inline=[];expected=set()
media={'rhine-dimples/docs/live-media/rhine-open.mp4','rhine-dimples/docs/live-media/rhine-close.mp4','rhine-dimples/docs/live-media/rhine-poster.jpg'}
class Page(HTMLParser):
 def __init__(self,file): super().__init__();self.file=file;self.in_script=False
 def handle_starttag(self,tag,attrs):
  d=dict(attrs)
  if tag=='script':
   self.in_script=True
   if d.get('type','').lower()=='module':errors.append(f'{self.file.relative_to(root)}: module script')
  for attr in ('src','href','poster'):
   value=d.get(attr,'');u=urlsplit(value)
   if not value or value.startswith('#'):continue
   if u.scheme or u.netloc:
    if attr in ('src','poster') or (tag=='link' and d.get('rel')=='stylesheet'):
     if u.scheme!='data':errors.append(f'{self.file.relative_to(root)}: external automatic asset {value}')
    continue
   if not u.path:continue
   dest=(self.file.parent/unquote(u.path)).resolve()
   if not dest.is_relative_to(root):errors.append(f'{self.file.relative_to(root)}: path escapes kit {value}');continue
   rel=str(dest.relative_to(root))
   if dest.is_dir():errors.append(f'{self.file.relative_to(root)}: directory link depends on server index {value}')
   elif not dest.exists():
    if rel in media:expected.add(rel)
    else:errors.append(f'{self.file.relative_to(root)}: missing {value}')
   if tag=='script' and attr=='src':script_files.add(dest)
 def handle_endtag(self,tag):
  if tag=='script':self.in_script=False
 def handle_data(self,data):
  if self.in_script:inline.append((str(self.file.relative_to(root)),data))
for f in root.rglob('*.html'):
 pages+=1;parser=Page(f);parser.feed(f.read_text())
patterns=[r'\bfetch\s*\(',r'\bXMLHttpRequest\b',r'^\s*(?:import\s|export\s)',r'\bimport\s*\(',r'new\s+(?:Worker|SharedWorker)\s*\(',r'\bserviceWorker\b']
for f in sorted(script_files):
 # Three.js includes general loader APIs; these applications only use its local geometry/shader renderer.
 if f.name=='three-r128.min.js':continue
 if f.exists():inline.append((str(f.relative_to(root)),f.read_text()))
for file,code in inline:
 for pattern in patterns:
  if re.search(pattern,code,re.M):errors.append(f'{file}: possible server/module dependency: {pattern}')
for f in root.rglob('*.css'):
 if re.search(r'@import|url\s*\(\s*[\"\']?https?://',f.read_text(),re.I):errors.append(f'{f.relative_to(root)}: remote CSS dependency')
report={'html_pages':pages,'classic_script_files':len(script_files),'expected_missing_media':sorted(expected),'errors':errors,'boundary':'Static dependency audit only; actual file:// execution and GPU rendering remain browser-dependent and unverified.'}
print(json.dumps(report,indent=2));raise SystemExit(bool(errors))
