import asyncio,sys,json
from playwright.async_api import async_playwright
URL="file:///home/claude/stonx-english/dist/local.html"
ANS="""()=>{const q=cur;if(q.t=='order'){const tiles=[...document.querySelectorAll('#pool .tile')];const used=new Set();for(const w of q.words){const t=tiles.find((b,i)=>!used.has(i)&&b.textContent==w&&!b.classList.contains('used'));used.add(tiles.indexOf(t));t.click()}document.getElementById('chk').click()}else{document.querySelectorAll('.opt')[q.a].click()}return 1}"""
async def answer_all(p,wrong_every=0):
    n=0
    while True:
        if await p.locator('.done').count(): return n
        await p.evaluate(ANS); n+=1
        await p.evaluate("nextQ()")
        if n>100: raise Exception("loop")
async def main():
    async with async_playwright() as pw:
        b=await pw.chromium.launch(executable_path="/usr/bin/google-chrome",args=["--no-sandbox"])
        p=await b.new_page(viewport={"width":400,"height":860},device_scale_factor=2)
        errs=[];p.on("pageerror",lambda e:errs.append(str(e)));p.on("console",lambda m:m.type=="error" and errs.append(m.text))
        await p.goto(URL);await p.wait_for_timeout(500)
        await p.screenshot(path="/home/claude/a1_home.png")
        await p.screenshot(path="/home/claude/a1_home_full.png",full_page=True)
        ids=await p.evaluate("A1.map(u=>u.id)")
        only=sys.argv[1].split(",") if len(sys.argv)>1 else ids
        for uid in only:
            await p.evaluate(f"go('unit:{uid}')")
            if uid=="u3": await p.screenshot(path="/home/claude/a1_unit.png")
            await p.evaluate(f"go('learn:{uid}')")
            if uid in("u13","u16"): await p.screenshot(path=f"/home/claude/a1_learn_{uid}.png",full_page=True)
            await p.evaluate(f"go('words:{uid}')")
            await p.evaluate(f"go('flash:{uid}')")
            if uid=="u5": await p.screenshot(path="/home/claude/a1_flash.png")
            await p.evaluate(f"wordQuiz('{uid}')"); await answer_all(p)
            nsets=await p.evaluate(f"Math.ceil(unitData(U('{uid}')).prac.length/SET)")
            for i in range(nsets):
                await p.evaluate(f"startPrac('{uid}',{i})")
                if uid=="u13" and i==0: await p.screenshot(path="/home/claude/a1_q.png")
                await answer_all(p)
            nl=await p.evaluate(f"Math.ceil(unitData(U('{uid}')).lis.length/SET)")
            for i in range(nl):
                await p.evaluate(f"startLis('{uid}',{i})")
                if uid=="u14" and i==0: await p.screenshot(path="/home/claude/a1_lis.png")
                await answer_all(p)
            await p.evaluate(f"go('speak:{uid}')")
            if uid=="u18": await p.screenshot(path="/home/claude/a1_speak.png")
            await p.evaluate("window._spSkip()")
            nr=await p.evaluate(f"(U('{uid}').read||[]).length")
            for i in range(nr):
                await p.evaluate(f"startRead('{uid}',{i})")
                if uid=="u16": await p.screenshot(path="/home/claude/a1_read.png")
                await answer_all(p)
            if await p.evaluate(f"!!U('{uid}').write"):
                await p.evaluate(f"go('write:{uid}')")
                await p.evaluate(f"orderPara('{uid}')")
                if uid=="u16": await p.screenshot(path="/home/claude/a1_para.png")
                await answer_all(p)
                await p.evaluate(f"mark('{uid}:rw')")
            await p.evaluate(f"openStep('{uid}','test')"); await answer_all(p)
            res=await p.evaluate(f"STEPS.map(s=>stepDone(U('{uid}'),s[0])?1:0).join('')")
            print(uid,"steps",res,"errs",len(errs)); 
        await p.evaluate("run=null;go('home')"); await p.screenshot(path="/home/claude/a1_home2.png")
        await p.evaluate("finalExam()"); n=await answer_all(p); print("final",n, await p.evaluate("P.final"))
        await p.evaluate("go('irr')"); await p.evaluate("go('dict')"); await p.fill('#dq','teach'); await p.screenshot(path="/home/claude/a1_dict.png")
        print("ERRORS",errs[:10])
        await b.close()
asyncio.run(main())
