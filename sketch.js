//variaveis
//dino variaveis
var dinossaulo,dino_corre,dino_morre,dinossaulo_colidiu;

//le groups
var grupoDeNuvem1,grupoDeNuvem2,grupoDeCAQUITU;

//pontinhos bunitos legais e divertidos
pontuacao = 0;

//estados
var JOGAR = 1;

var SUCUMBIR = 0;

var estadoDeJogo = JOGAR;

//bordas
var bordaaa;

//variaveis chão
var chon,chin_foto;

//variaveis chão invisivel
var chon_invisivel;

//gameover
var imagem_gameover;

var gameover;

var reiniciar;

var imagem_reiniciar;

var pontos;

//variaveis sons
var morreu;

var pulou;

var pontin;

//variavel da foto da nuvem
var imagem_nuvem;
//pre carregar
function preload () {
  //animação do dino
  dino_corre = loadAnimation("trex1.png","trex3.png","trex4.png");
  
  //imagem do chão
  chin_foto = loadImage("ground2.png");
  
  dinossaulo_colidiu = loadAnimation("trex_collided.png");
  
  //imagem da nuvem
  imagem_nuvem = loadImage("cloud.png");
  
  imagem_gameover = loadImage("gameOver.png");
  
  imagem_reiniciar = loadImage("restart.png");
  
  imagemdoobstaculo1 = loadImage("obstacle1.png");
  
  imagemdoobstaculo2 = loadImage("obstacle2.png");

  imagemdoobstaculo3 = loadImage("obstacle3.png");
  
  imagemdoobstaculo4 = loadImage("obstacle4.png");
  
  imagemdoobstaculo5 = loadImage("obstacle5.png");
  
  imagemdoobstaculo6 = loadImage("obstacle6.png");
  
  //carregar sons
  morreu = loadSound("die.mp3");
  
  pulou = loadSound("jump.mp3");
  
  pontin = loadSound("checkPoint.mp3");
  
  
}

//os coiso pra fazer os coiso
function setup() {
  //cria a tela
  createCanvas(600,200);
  
  pontos = 0;
  
  //cria o sprite do chão
  chon = createSprite(300,180,600,20);
  
  //cria o sprite do dino
  dinossaulo = createSprite(50,60,20,50);
  
  //FAZ a animação do dino ACONTECER
  dinossaulo.addAnimation("corre",dino_corre);
  
  //morreu lol
  dinossaulo.addAnimation("morreu",dinossaulo_colidiu);
  
  //aumenta o tamanho do dino
  dinossaulo.scale = 0.5;
  
  //coloca o sprite do chão
  chon.addImage("sla",chin_foto);
  
  gameover = createSprite(300,100,20,50);
  gameover.addImage("gameovi",imagem_gameover);
  gameover.scale = 0.75;
  gameover.visible = false;
  
  
  reiniciar = createSprite(300,135,20,50);
  reiniciar.addImage("reinica",imagem_reiniciar);
  reiniciar.scale = 0.5;
  reiniciar.visible = false;
  
  grupoDeCAQUITU = new Group();
  grupoDeNuvem1 = new Group();
  grupoDeNuvem2 = new Group();
  
  //cria sprite do chão invisivel
  chon_invisivel = createSprite(300,190,600,10);
  
  chon_invisivel.visible = false;
  
  //cria as bordas
  bordaaa = createEdgeSprites();
}

//desenha as coisa e uns if
function draw() {
  //cor do fundo
  background("white");
  
  text("PONTOS "+pontos,10,30);
  
  if (estadoDeJogo === JOGAR) {
    dinossaulo.changeAnimation("corre",dino_corre);
    
    pontos = Math.round(frameCount/2.5);
    
    //velocidade do chão
    chon.velocityX = -5;
    
    cria_nuvem();
  
    cria_cacto();
    
    if (pontos % 100 === 0 && pontos > 0){
      pontin.play();
    }    
    
    //velocidade do dino
    dinossaulo.velocityY = dinossaulo.velocityY + 0.5
    
   if (keyDown("SPACE") && dinossaulo.y > 160) {
    
    //o quão alto ele pula
    dinossaulo.velocityY = -10;
    pulou.play();
  }
    
    if (chon.x < 0){
      chon.x = chon.width/2;
    }
    if (grupoDeCAQUITU.isTouching(dinossaulo)) {
      estadoDeJogo = SUCUMBIR;
      morreu.play();
    } 
  }
  else if (estadoDeJogo === SUCUMBIR) {
    chon.velocityX = 0;
    
    gameover.visible = true;
    reiniciar.visible = true;
    
    frameCount = 0;
    
    dinossaulo.velocityY = 0;
    
    grupoDeCAQUITU.setVelocityXEach(0);
    
    grupoDeNuvem1.setVelocityXEach(0);
    
    grupoDeNuvem1.setLifetimeEach(-1);
    
    grupoDeNuvem2.setVelocityXEach(0);
    
    grupoDeNuvem2.setLifetimeEach(-1);
    
    grupoDeCAQUITU.setLifetimeEach(-1);
    
    dinossaulo.changeAnimation("morreu",dinossaulo_colidiu);
    
    if (mousePressedOver(reiniciar)) {
       reset();
    }
  }
  
  //faz o chão ser infinito
  if (chon.x < 0) {
    //faz que quando chega na metade da tela voltar e parecer infinito
    chon.x = chon.width / 2;
  }
  
  //colisão com o dino e o chão
  dinossaulo.collide(chon_invisivel);
  
  //desenha os coiso tudo
  drawSprites();
}

function cria_nuvem() {
  if (frameCount % 60 === 0){
    var nuvem1 = createSprite(615,30,30,10);
    nuvem1.addImage("nuvem",imagem_nuvem);
    nuvem1.scale = 0.7;
    nuvem1.velocityX = -4;
    nuvem1.depth = dinossaulo.depth;
    var nuvem2 = createSprite(625,55,30,10);
    nuvem2.addImage("nuvem",imagem_nuvem);
    nuvem2.scale = 0.5;
    nuvem2.velocityX = -2.5;
    nuvem2.depth = dinossaulo.depth;
    dinossaulo.depth = dinossaulo.depth + 1;
    
    grupoDeNuvem1.add(nuvem1);
    grupoDeNuvem2.add(nuvem2);
  }
}

function cria_cacto() {
  if (frameCount %60 === 0) {
    var cacto = createSprite(625,165,20,50);
  cacto.velocityX = -5;
     var rand = Math.round(random(1,6));
     switch (rand) {
         case 1:cacto.addImage(imagemdoobstaculo1);
         break;
         case 2:cacto.addImage(imagemdoobstaculo2);
         break;
         case 3:cacto.addImage(imagemdoobstaculo3);
         break;
         case 4:cacto.addImage(imagemdoobstaculo4);
         break;
         case 5:cacto.addImage(imagemdoobstaculo5);
         break;
         case 6:cacto.addImage(imagemdoobstaculo6);
         break;
         default:break;
     }
     cacto.scale = 0.5;
    
    
     cacto.depth = dinossaulo.depth;
     dinossaulo.depth = dinossaulo.depth + 1;
     grupoDeCAQUITU.add(cacto);
     cacto.lifetime = 235;
  }
}

function reset() {  
  dinossaulo.x = 50; 
  dinossaulo.y = 60;
  gameover.visible = false;
  reiniciar.visible = false;
  grupoDeNuvem1.destroyEach();
  grupoDeNuvem2.destroyEach();
  grupoDeCAQUITU.destroyEach();
  estadoDeJogo = JOGAR;
  pontos = 0;
}