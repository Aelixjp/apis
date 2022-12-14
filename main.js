import WebGLRenderer from "./classes/WebGLRenderer.js";

window.onload = () =>
{
    const synth       = window.speechSynthesis;
    const voices      = synth.getVoices();
    const contenido   = document.getElementById("contenido"       );
    const escuchar    = document.getElementById("escuchar"        );
    const giff        = document.getElementById("giff"            );
    const giff_title  = document.getElementById("giff_title"      );
    const random_giff = document.getElementById("random_giff"     );
    const canvas      = document.getElementById("web-gl"          );

    //API KEY NASA API
    const NASA_KEY            = "7tFOOnPd86nNyytsMp7PTRwfvvt7NxisulBcD55c";
    const GIPHY_KEY           = "DJTZrZ7QqYooY6fNGFzroi24zb8xF8V1";

    /*async function getNasaData()
    {
        return await fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}`).then(res => res.json());
    }*/

    async function getGiff()
    {
        return await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${GIPHY_KEY}&tag=&rating=g`).then(res => res.json());
    }

    function leerTexto()
    {
        const texto           = contenido.textContent;
        const utterThis       = new SpeechSynthesisUtterance(texto);
              utterThis.voice = voices[0];  //Helena Spanish

        synth.speak(utterThis);
    }

    async function showGiff()
    {
        const giff_g = await getGiff();
        const info = giff_g.data;

        const { title, images } = info;
        const giff_loop = images.looping;

        giff.src = giff_loop.mp4;
        giff_title.textContent = title;
    }

    function addListeners()
    {
        escuchar.onclick    = leerTexto;
        random_giff.onclick = showGiff;
    }

    function setup()
    {
        const glRenderer = new WebGLRenderer(canvas);
              glRenderer.main();

        addListeners();
        showGiff();
    }

    setup();

}