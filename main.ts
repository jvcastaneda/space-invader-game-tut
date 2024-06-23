controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . 7 7 . . . . . . . . 
        . . . . . . 7 7 . . . . . . . . 
        . . . . . . 7 7 . . . . . . . . 
        . . . . . . 7 7 . . . . . . . . 
        . . . . . . 7 7 . . . . . . . . 
        `, mySprite, 0, -50)
    music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.InBackground)
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Projectile, function (sprite, otherSprite) {
    music.play(music.melodyPlayable(music.bigCrash), music.PlaybackMode.InBackground)
    info.changeScoreBy(1)
    sprites.destroy(otherSprite)
    sprites.destroy(sprite, effects.disintegrate, 500)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.fire, 500)
    scene.cameraShake(4, 500)
    info.changeLifeBy(-1)
})
let asteroid: Sprite = null
let projectile: Sprite = null
let mySprite: Sprite = null
effects.starField.startScreenEffect()
mySprite = sprites.create(img`
    . . . . . . . c d . . . . . . . 
    . . . . . . . c d . . . . . . . 
    . . . . . . . c d . . . . . . . 
    . . . . . . . c b . . . . . . . 
    . . . . . . . f f . . . . . . . 
    . . . . . . . c 7 . . . . . . . 
    . . . . . . . f f . . . . . . . 
    . . . . . . . 8 7 . . . . . . . 
    . . . . . . 8 8 5 6 . . . . . . 
    . . . . . . 8 7 5 6 . . . . . . 
    . . . . . c c c 6 6 6 . . . . . 
    . . . . 8 8 7 7 7 5 6 6 . . . . 
    . . 8 f f f c c 6 6 f f 6 6 . . 
    . 8 8 8 8 6 6 7 7 7 7 5 7 6 6 . 
    8 8 8 8 8 8 6 6 7 7 7 5 7 7 6 6 
    8 8 8 8 8 8 6 6 7 7 7 7 5 7 6 6 
    `, SpriteKind.Player)
mySprite.setPosition(79, 108)
controller.moveSprite(mySprite, 100, 0)
mySprite.setStayInScreen(true)
game.onUpdateInterval(1000, function () {
    asteroid = sprites.createProjectileFromSide(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . c c c c . . 
        . c c c c c . c c c c c f c c . 
        c c a c c c c c 8 f f c f f c c 
        c a f a a c c a f f c a a f f c 
        c a 8 f a a c a c c c a a a a c 
        c b c f a a a a a c c c c c c c 
        c b b a a c f 8 a c c c 8 c c c 
        . c b b a b c f a a a 8 8 c c . 
        . . . . a a b b b a a 8 a c . . 
        . . . . c b c a a c c b . . . . 
        . . . . b b c c a b b a . . . . 
        . . . . b b a b a 6 a . . . . . 
        . . . . c b b b 6 6 c . . . . . 
        . . . . . c a 6 6 b c . . . . . 
        . . . . . . . c c c . . . . . . 
        `, 0, 50)
    asteroid.x = randint(0, scene.screenWidth())
    asteroid.setKind(SpriteKind.Enemy)
})
