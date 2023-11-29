import Phaser from 'phaser'
export default class CollectingStarsScenes extends Phaser.Scene{
    constructor(){
        super('collecting-stars-scene')
    }

    //METHOD INNIT
    init(){
        this.platforms = undefined
        this.player = undefined
        this.stars = undefined
    }


    //METHOD PRELOAD
    preload(){
        this.load.image('ground', 'images/platform.png')
        this.load.image('star', 'images/star.png')
        this.load.image('sky', 'images/sky.png')
        this.load.image('bomb', 'images/bomb.png')

        //upload SpriteSheet
        this.load.spritesheet('dude ', 'images/dude.png', { frameWidth: 32, frameHeight: 48})
    }


    //METHOD CREATE
    create(){
        this.add.image(400, 300, 'sky')
        this.platforms = this.physics.add.staticGroup()
        this.platforms.create(600, 400, 'ground')
        this.platforms.create(50, 250, 'ground')
        this.platforms.create(750, 220, 'ground')
        this.platforms.create(400, 568, 'ground').setScale(2).refreshBody()

        //create player
        this.player = this.physics.add.sprite(100, 450, 'dude')
        this.player.setCollideWorldBounds(true)
        this.physics.add.collider(this.player, this.platforms)

        //create stars
        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 10,
            setXY: { x:50, y:0, stepXY: 70 }
        });
        this.physics.add.collider(this.stars, this.platforms)
        this.stars.children.iterate(function(child){
            // @ts-ignore
            child.setBounceY(0.5)
        })
    }

    //METHOD UPDATE
    update(){}
}