async function sorulariGetir() {
    try {
        const data = await $.ajax({
            url: "/resimliSorulariGetir",
            method: "GET",
            dataType: "json"
        });
        return data;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

var puan = 0;
async function oyunuBaslat() {
    document.getElementById("oyunBaslatmaBilgisi").remove();
    document.getElementById("oyunEkrani").removeAttribute("hidden");
    const sorular = await sorulariGetir();
    let i = 0;

    soruGetir(sorular[i]);

    document.getElementById("cevaplaBtn").addEventListener("click", (event) => {

        kelimeKontrol(sorular[i]);

        setTimeout(() => {
            soruSil();
            i++;
            if (i < sorular.length) {
                soruGetir(sorular[i]);
                return;
            } else {
                alert("Oyun Bitti! Puanınız = " + puan);
                location.reload();
            }
        }, 1500);

    });

}

function soruSil() {
    const soruResmi = document.getElementById("soruResmi").lastChild;
    document.getElementById("soruResmi").removeChild(soruResmi);
    const letterBoxes = document.querySelectorAll(".letter-box");

    for (let i = 0; i < letterBoxes.length; i++) {

        letterBoxes[i].remove();

    }

}

async function kelimeKontrol(soru) {

    let harfKutulari = document.querySelectorAll(".letter-box");
    let yazilanCevap = "";
    for (let i = 0; i < harfKutulari.length; i++) {
        yazilanCevap += harfKutulari[i].firstChild.textContent
    }

    if (kontrolEt(yazilanCevap, soru.riy_ingilizce)) {


        document.getElementById("puanDiv").classList.remove("bg-primary");
        document.getElementById("puanDiv").classList.add("bg-success");

        puan += 10;
        setTimeout(() => {

            document.getElementById("puanDiv").classList.remove("bg-success");
            document.getElementById("puanDiv").classList.add("bg-primary");

        }, 1500);

    } else {

        document.getElementById("puanDiv").classList.remove("bg-primary");
        document.getElementById("puanDiv").classList.add("bg-danger");

        puan -= 10;
        setTimeout(() => {

            document.getElementById("puanDiv").classList.remove("bg-danger");
            document.getElementById("puanDiv").classList.add("bg-primary");

        }, 1500);
    }
    document.getElementById("toplamPuan").textContent = puan;

}

function harfSil(index) {
    var letterBoxes = document.querySelectorAll(".letter-box span");
    if (index < letterBoxes.length) {
        letterBoxes[index].innerText = "";
    }
}

function harfYazDinleme(soru) {

    var harfIndex = 0;
    document.addEventListener("keydown", function (event) {
        if (event.key === "Backspace" && harfIndex > 0) {
            harfIndex--;
            harfSil(harfIndex);
        } else if (/^[a-zA-Z]$/.test(event.key) && harfIndex < soru.riy_ingilizce.length) {
            var harf = event.key.toLowerCase();
            harfYaz(harf, harfIndex);
            harfIndex++;
        }

    });

}



function harfYaz(harf, index) {
    const letterBoxes = document.querySelectorAll(".letter-box span");
    if (index < letterBoxes.length) {
        letterBoxes[index].innerText = harf;
    }

}

function kontrolEt(yazilanCevap, dogruCevap) {
    yazilanCevap = yazilanCevap.toLowerCase();
    dogruCevap = dogruCevap.toLowerCase();
    return (yazilanCevap == dogruCevap) ? true : false;
}

function soruGetir(soru) {


    const srcStaticYol = "/static/images/riy/";
    const soruResmi = document.createElement("img");
    soruResmi.src = srcStaticYol + soru.riy_resim;
    soruResmi.style = "width: 250px; height: 250px";
    soruResmi.className = "img-fluid";
    document.getElementById("soruResmi").appendChild(soruResmi);


    for (let i = 0; i < soru.riy_ingilizce.length; i++) {
        const letterBoxDiv = document.createElement("div");
        letterBoxDiv.classList = "letter-box mx-1";
        const letterBoxSpan = document.createElement("span");
        letterBoxDiv.appendChild(letterBoxSpan);
        document.getElementById("letterBoxes").appendChild(letterBoxDiv);
    }

    harfYazDinleme(soru);

}