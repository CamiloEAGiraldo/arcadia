import {
    ViewerApp,
    AssetManagerPlugin,
    GBufferPlugin,
    timeout,
    ProgressivePlugin,
    TonemapPlugin,
    SSRPlugin,
    SSAOPlugin,
    DiamondPlugin,
    FrameFadePlugin,
    GLTFAnimationPlugin,
    GroundPlugin,
    BloomPlugin,
    TemporalAAPlugin,
    AnisotropyPlugin,
    GammaCorrectionPlugin,

    addBasePlugins,
    ITexture, TweakpaneUiPlugin, AssetManagerBasicPopupPlugin, CanvasSnipperPlugin,

    IViewerPlugin,

    // Color, // Import THREE.js internals
    // Texture, // Import THREE.js internals
} from "webgi";
import "./styles.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger)


async function setupViewer(){

    // Initialize the viewer
    const viewer = new ViewerApp({
        canvas: document.getElementById('webgi-canvas') as HTMLCanvasElement,
    })

    // Add some plugins
    const manager = await viewer.addPlugin(AssetManagerPlugin)
    const camera = viewer.scene.activeCamera
    const position = camera.position
    const target = camera.target

    // Add a popup(in HTML) with download progress when any asset is downloading.
    await viewer.addPlugin(AssetManagerBasicPopupPlugin)

    // Add plugins individually.
    // await viewer.addPlugin(GBufferPlugin)
    // await viewer.addPlugin(new ProgressivePlugin(32))
    // await viewer.addPlugin(new TonemapPlugin(!viewer.useRgbm))
    // await viewer.addPlugin(GammaCorrectionPlugin)
    // await viewer.addPlugin(SSRPlugin)
    // await viewer.addPlugin(SSAOPlugin)
    // await viewer.addPlugin(DiamondPlugin)
    // await viewer.addPlugin(FrameFadePlugin)
    // await viewer.addPlugin(GLTFAnimationPlugin)
    // await viewer.addPlugin(GroundPlugin)
    // await viewer.addPlugin(BloomPlugin)
    // await viewer.addPlugin(TemporalAAPlugin)
    // await viewer.addPlugin(AnisotropyPlugin)

    // or use this to add all main ones at once.
    await addBasePlugins(viewer)

    // Add more plugins not available in base, like CanvasSnipperPlugin which has helpers to download an image of the canvas.
    await viewer.addPlugin(CanvasSnipperPlugin)

    // This must be called once after all plugins are added.
    viewer.renderer.refreshPipeline()

    await manager.addFromPath("./assets/arcadia.glb")

    // Scroll Animation

    function setupScrollAnimation(){
        const tl = gsap.timeline()
        tl

        .to(position, {
            x: -3.3078384129,
            y: 0.6659602128, 
            z: 2.2075609238,
            startAt: {
                x: -0.3928762452,
                y: -8.6929982427, 
                z: -0.147878763,
            },
            duration: 4,
            scrollTrigger: {
                trigger: ".second", 
                start: "top bottom",
                end: "top top",
                markers: true,
                scrub: true,
                immediateRender: true,
            },
            onUpdate
        })

        .to(target, {
            x: -0.2956964067,
            y: -0.1027914313, 
            z: -0.3053709674,
            startAt: {
                x: 0,
                y: 0, 
                z: 0,
            },
            duration: 4,
            scrollTrigger: {
                trigger: ".second", 
                start: "top bottom",
                end: "top top",
                markers: true,
                scrub: true,
                immediateRender: true,
            },
        })

        .to(position, {
            x: -2.4410393193,
            y: 0.3196391486, 
            z: 1.2270329308,
            startAt: {
                x: -3.3078384129,
                y: 0.6659602128, 
                z: 2.2075609238,
            },
            duration: 4,
            scrollTrigger: {
                trigger: ".third", 
                start: "top bottom",
                end: "top top",
                markers: true,
                scrub: true,
                immediateRender: false,
            },
            onUpdate
        })

        .to(target, {
            x: -1.069945575,
            y: -0.2195936264, 
            z: -0.5440109392,
            startAt: {
                x: -0.2956964067,
                y: -0.1027914313, 
                z: -0.3053709674,
            },
            duration: 4,
            scrollTrigger: {
                trigger: ".third", 
                start: "top bottom",
                end: "top top",
                markers: true,
                scrub: true,
                immediateRender: false,
            },
        })

        .to(position, {
            x: 4.8337509222,
            y: 3.6501839343, 
            z: -3.4769826739,
            startAt: {
                x: -2.4410393193,
                y: 0.3196391486, 
                z: 1.2270329308,
            },
            duration: 4,
            scrollTrigger: {
                trigger: ".fourth", 
                start: "top bottom",
                end: "top top",
                markers: true,
                scrub: true,
                immediateRender: false,
            },
            onUpdate
        })

        .to(target, {
            x: -0.4260058075,
            y: -0.0482893738, 
            z: -0.8729723221,
            startAt: {
                x: -1.069945575,
                y: -0.2195936264, 
                z: -0.5440109392,
            },
            duration: 4,
            scrollTrigger: {
                trigger: ".fourth", 
                start: "top bottom",
                end: "top top",
                markers: true,
                scrub: true,
                immediateRender: false,
            },
        })

        .to(position, {
            x: -4.8264563802,
            y: 1.4521990775, 
            z: 1.5752828063,
            startAt: {
                x: 4.8337509222,
                y: 3.6501839343, 
                z: -3.4769826739,
            },
            duration: 4,
            scrollTrigger: {
                trigger: ".fifth", 
                start: "top bottom",
                end: "top top",
                markers: true,
                scrub: true,
                immediateRender: false,
            },
            onUpdate
        })

        .to(target, {
            x: -1.2722721864,
            y: 0.0872011154, 
            z: -0.4877664024,
            startAt: {
                x: -0.4260058075,
                y: -0.0482893738, 
                z: -0.8729723221,
            },
            duration: 4,
            scrollTrigger: {
                trigger: ".fifth", 
                start: "top bottom",
                end: "top top",
                markers: true,
                scrub: true,
                immediateRender: false,
            },
        })


    }
setupScrollAnimation()





    // Webgi update
    
        let needsUpdate = true;
    
        function onUpdate(){
            needsUpdate = true
            viewer.renderer.resetShadows()
        
            viewer.addEventListener('preFrame', ()=>{
                if(needsUpdate){
                    camera.positionUpdated(true);
                    camera.targetUpdated(true);
                    needsUpdate = false
                }
    
            })
        } 
}

setupViewer()
