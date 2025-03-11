export class HelpPanel{
    constructor({} = {}) {
        const helpBtn = document.createElement("button");
        helpBtn.innerText = "?";
        helpBtn.id = "help-btn";
        helpBtn.style.cssText = `
        position: absolute;
        top: 1rem;
        right: 1rem;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        font-size: 20px;
        background: #333;
        color: white;
        border: none;
        cursor: pointer;
        z-index: 1000;
        `;

        const helpPopup = document.createElement("div");
        helpPopup.id = "help-popup";
        helpPopup.style.cssText = `
        position: absolute;
        top: 60px;
        right: 1rem;
        background: rgba(0, 0, 0, 0.85);
        color: white;
        padding: 1rem;
        border-radius: 10px;
        width: 250px;
        font-size: 14px;
        display: none;
        z-index: 1000;
        `;

        helpPopup.innerHTML = `
        <h3 style="margin-top: 0;">Camera Controls</h3>
        <p>🖱 Left Click + Drag: Rotate</p>
        <p>🖱 Right Click + Drag: Pan</p>
        <p>🔍 Scroll Wheel: Zoom</p>
        <p>🕹 W/A/S/D/Q/E: Move (Pointer Mode)</p>
        <p>🖱 Click anywhere to switch modes</p>
        <button id="close-help" style="
            margin-top: 0.5rem;
            background: #555;
            color: #fff;
            border: none;
            border-radius: 4px;
            padding: 5px 10px;
            cursor: pointer;
        ">Close</button>
        `;

        document.body.appendChild(helpBtn);
        document.body.appendChild(helpPopup);

        helpBtn.addEventListener("click", () => {
        helpPopup.style.display = "block";
        });

        document.getElementById("close-help").addEventListener("click", () => {
        helpPopup.style.display = "none";
        });
    }
}