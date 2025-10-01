import { _decorator, Component, screen, Size, sys } from "cc";
const { ccclass, property } = _decorator;

@ccclass("game-resize-window")
export class GameResizeWindow extends Component {
    private readonly portraitResolution = {
        width: 786,
        height: 1398,
    };

    private timeout: any;

    protected onLoad(): void {
        this.adjustResolution();
        window.addEventListener("resize", this.debouncedResizeWindow);
    }

    protected onDestroy(): void {
        window.removeEventListener("resize", this.debouncedResizeWindow);
    }

    adjustResolution() {
        const { width, height } = this.portraitResolution;

        if (!sys.isMobile) {
            const gameContainer = document.getElementById("Cocos3dGameContainer");
            gameContainer.style.position = "relative";
            // For desktop browsers, use the original logic
            const ratioScale = window.innerHeight / height;
            const newWidth = ratioScale * width;

            const dpr = screen.devicePixelRatio || 1;

            screen.windowSize = new Size(Math.round(newWidth * dpr), Math.round(window.innerHeight * dpr));
        }
    }

    debounce(func: any, wait: number) {
        return (...args: any[]) => {
            this.timeout && clearTimeout(this.timeout);
            this.timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    private resizeWindow() {
        this.adjustResolution();
    }

    private readonly debouncedResizeWindow = this.debounce(this.resizeWindow, 100);

}
