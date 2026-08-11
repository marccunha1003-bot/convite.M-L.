// ===============================
// Data limite para confirmação
// ===============================

const dataLimite = new Date("2026-09-16T23:59:59");

if (new Date() > dataLimite) {

    document.body.innerHTML = `
    <div style="
        min-height:100vh;
        display:flex;
        justify-content:center;
        align-items:center;
        background:#2d2d2d;
        color:white;
        font-family:Poppins,sans-serif;
        text-align:center;
        padding:30px;
    ">
        <div style="
            max-width:700px;
            background:rgba(255,255,255,.08);
            backdrop-filter:blur(10px);
            border-radius:20px;
            padding:40px;
            border:1px solid rgba(255,255,255,.2);
        ">
            <h1 style="font-family:'Cormorant Garamond',serif;font-size:50px;">
                💍 Confirmações encerradas
            </h1>

            <p style="font-size:22px;line-height:1.8;margin-top:20px;">
                O prazo para confirmação de presença foi encerrado.<br><br>

                Agradecemos imensamente o carinho e desejamos que Deus abençoe cada um de vocês. ❤️
            </p>

            <h2 style="margin-top:30px;font-family:'Cormorant Garamond',serif;">
                Marcelo & Lucimara
            </h2>
        </div>
    </div>
    `;

    throw new Error("Prazo encerrado");
}


const btnSim = document.querySelector(".sim");
const btnNao = document.querySelector(".nao");
const resultado = document.querySelector("#resultado");
const nome = document.querySelector("#nomeConvidado");

const URL =
"https://script.google.com/macros/s/AKfycbzTIYBFdUwgdSwzf7sflXRRhCrcRZi1J5xqEEd7GpvEKf5b02eMOR8nb3pdKB8WYnMX/exec";

async function enviar(resposta) {

    if (nome.value.trim() == "") {

        alert("Por favor, informe seu nome.");

        return;
    }

    const dados = {

        nome: nome.value.trim(),

        resposta: resposta

    };

    try {

        const respostaServidor = await fetch(URL, {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(dados)

        });

        const resultadoServidor = await respostaServidor.json();

        // Se já respondeu anteriormente
        if (resultadoServidor.status === "duplicado") {

            resultado.innerHTML = `
                ⚠️<br><br>
                <strong>Este nome já possui uma confirmação.</strong>
                <br><br>
                Não é possível confirmar novamente.
            `;

            return;
        }

        // Se foi registrado normalmente
        if (resultadoServidor.status === "ok") {

            resultado.innerHTML = `
                ❤️<br><br>
                Obrigado, <strong>${nome.value}</strong>!<br><br>
                Sua resposta foi registrada com sucesso.
            `;

            btnSim.disabled = true;

            btnNao.disabled = true;

            nome.disabled = true;
        }

    } catch (e) {

        resultado.innerHTML =
            "Ocorreu um erro ao enviar sua resposta.";

    }


}

btnSim.addEventListener("click",function(){

    enviar("Sim");

});

btnNao.addEventListener("click",function(){

    enviar("Não");

});