
const API_KEY = "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"; 

function add(user, text){
    const c = document.getElementById("chat");
    c.innerHTML += `<p><b>${user}:</b> ${text}</p>`;
    c.scrollTop = c.scrollHeight;
}

async function send(){
    const text = document.getElementById("msg").value;
    if(!text) return;

    add("Sen", text);
    document.getElementById("msg").value = "";
    add("nigg.ai", "Yazıyor...");

    try {
        const r = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method:"POST",
            headers:{
                "Authorization":"Bearer " + API_KEY,
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                model:"mixtral-8x7b-32768",
                messages:[
                    { role:"system", content:"Komik, hızlı, küfürsüz dark humor yap."},
                    { role:"user", content:text }
                ]
            })
        });

        const j = await r.json();
        document.querySelector("#chat p:last-child").remove();
        add("nigg.ai", j.choices[0].message.content);

    } catch (err) {
        document.querySelector("#chat p:last-child").remove();
        add("nigg.ai", "⚠ API hatası.");
    }
}
