/* ================================
    우쿨렐레 악보에 MP3 싱크 맞추는 프로그램.
================================ */

const song_list = [
  "60 BPM 4/4박자 드럼비트 (48000Hz)",
  "60 BPM 3/4박자 모노 드럼비트 (8000Hz)",
  "61 BPM 4/4박자 메트로놈 8비트 (8000Hz)",
  "62 BPM 4/4박자 심플락 그루브 (8000Hz)",
  "63 BPM 4/4박자 메트로놈 (8000Hz)",
  "63 BPM 4/4박자 펑키드럼 (48000Hz)",
  "80 BPM 4/4박자 드럼비트 (16000Hz)",
  "90 BPM 3/4박자 드럼비트 (8000Hz)",

  "하와이 연정 - 패티킴",
  "언제나 몇번이나 - 센과 치히로의 행방불명 OST",
  "때로는 옛 이야기를 - 붉은 돼지 OST",
  "세계의 약속 - 하울의 움직이는 성 OST",
  "비행기 구름 - 바람이 분다 OST", 
  "El Condor Pasa - 핑거스타일",
  "El Condor Pasa - 멜로디",
  "Kiss the Rain - 이루마",
  "코쿠리코 언덕에서 - 지브리OST",
  "인생의 회전목마 - 하울의 움직이는 성 OST",
  "비와 당신",
  "바다가 보이는 마을 - 마녀의 택급편",
  "Somewhere over the rainbow - IZ",
  "너에게 난 나에게 넌 - 자탄풍(자전거 탄 풍경)",
  "사건의 지평선 - 윤하",
  "오르트 구름 - 윤하"
];
const file_list = [
  "http://ccash.gonetis.com:88/uke_blog/data/60BPM_Drum_Beat_3min_48000Hz.json", 
  "http://ccash.gonetis.com:88/uke_blog/data/60Bpm_3-4Beat_Drum_8bit_mono_8000hz.json", 
  "http://ccash.gonetis.com:88/uke_blog/data/61bpm_metronome_drum_8000hz_8bitMono.json", 
  "http://ccash.gonetis.com:88/uke_blog/data/62bpm_Simple_Rock_Drum_Groove_8000hz_8bitMono.json", 
  "http://ccash.gonetis.com:88/uke_blog/data/63 bpm metronome drum.json", 
  "http://ccash.gonetis.com:88/uke_blog/data/63-BPM-Funk-Drum-Loop-YouTube.json", 
  "http://ccash.gonetis.com:88/uke_blog/data/80BPM_Drum_Beat_3min_stereo16000hz.json", 
  "http://ccash.gonetis.com:88/uke_blog/data/90Bpm_3-4Beat_Drum_8bit_mono_8000hz.json",

  "http://ccash.gonetis.com:88/uke_blog/data/hawaiian_lovesong.json",
  "http://ccash.gonetis.com:88/uke_blog/data/itsumonandodemo.json",
  "http://ccash.gonetis.com:88/uke_blog/data/sometimes_telling_old_story.json",
  "http://ccash.gonetis.com:88/uke_blog/data/appointment_of_world.json",
  "http://ccash.gonetis.com:88/uke_blog/data/hikoki_gumo.json",
  "http://ccash.gonetis.com:88/uke_blog/data/elcondorpasa_fingerstyle.json",
  "http://ccash.gonetis.com:88/uke_blog/data/elcondorpasa_melody.json",
  "http://ccash.gonetis.com:88/uke_blog/data/kiss_the_rain_new.json",
  "http://ccash.gonetis.com:88/uke_blog/data/kokuriko-ghibri.json",
  "http://ccash.gonetis.com:88/uke_blog/data/merry_go_round_in_Life.json",
  "http://ccash.gonetis.com:88/uke_blog/data/rain_and_you.json",
  "http://ccash.gonetis.com:88/uke_blog/data/umigamierumachi.json",
  "http://ccash.gonetis.com:88/uke_blog/data/SomewhereOvertheRainbow.json",
  "http://ccash.gonetis.com:88/uke_blog/data/me_toyou_you_tome.json",
  "http://ccash.gonetis.com:88/uke_blog/data/event_horizon-yunha.json",
  "http://ccash.gonetis.com:88/uke_blog/data/oort_cloud-yunha.json"
];


const CHORD_ICON_Y = 48;
const STROKE_ICON_Y = 136;
const TAB_LINE_A_Y = 20;
const TAB_LINE_E_Y = TAB_LINE_A_Y+16;
const TAB_LINE_C_Y = TAB_LINE_E_Y+16;
const TAB_LINE_G_Y = TAB_LINE_C_Y+16;
// const LYRIC_TEXT_Y = 164;
const START_XPOS = 60;
const CANVAS_FONT_BIGGER = '32px SeoulNamsan canvas';
const CANVAS_FONT_BIG = '26px SeoulNamsan canvas';
const CANVAS_FONT_BASIC = '20px SeoulNamsan canvas';
const CANVAS_FONT_SMALL = '16px SeoulNamsan canvas';
const CANVAS_FONT_SMALLER = '12px SeoulNamsan canvas';
const CANVAS_FONT_TINY = '9px SeoulNamsan canvas';

const WAVEFORM_COLOR_PAST = "darkgray";
const WAVEFORM_COLOR_ODD = "blue";
const WAVEFORM_COLOR_EVEN = "green";
const QUAVER_GRID_COLOR = "#BBC";
const QUAVER_BG_COLOR = "#CCD";
const QUAVER_FIRST_COLOR = "#BBC";
const LYRIC_BG_COLOR = "#FDD";
const LYRIC_FIRST_COLOR = "#ECC";

const CHORD_TEXT_COLOR = "#155";
const LYRIC_TEXT_COLOR = "#344";

const H_OFFSET_SLIDER = 10;
const H_RULER = 12;
const H_WAVEFORM = 200;
const H_CHORD = 52;
const H_NOTES = 84;
const H_LYRIC = 26;
const H_STROKE = 22;
const H_TECHNIC = 40;
const H_TOTAL = (H_OFFSET_SLIDER+H_RULER+H_WAVEFORM+H_CHORD+H_NOTES+H_LYRIC+H_TECHNIC+H_RULER);

var note_icon;          // 운지 위치 (flet)을 표시하는 숫자들 - 비트맵, 스프라이트
var chord_icon;         // 코드 테이블을 모아 둔 비트맵

var canvas_width = 0, canvas_height = 0;

var song_data = null;   // 우쿨렐레 TAB 악보를 불러 올 JSON 객체. 
var audioTag;           // song play & stop, etc..

var scrollPosition = 0; // to drawing waveform start draw
var array_l = [];       // WAVEFORM data - float32 로 되어 있음.

/* ================================
    HTML 로드 되고 초기화 동작. - resource load, etc..
================================ */
window.onload = function main() {
  ////  비트맵 리소스 로드.  bitmap resources ready.
  note_icon = document.getElementById("uke_note");
  chord_icon = document.getElementById("whole_chords");

  //// URL로 부터 parameter 를 읽어 와서 곡을 선택할 수 있게 함. - 현재는 play 파라메터 뿐.
  let initialSelect = getParameterByName("initial_idx");
  if ( !initialSelect ) {
    initialSelect = 0;
  }
  console.log("request initial Song file index:" + initialSelect );

  ////  악보 데이터를 고를 수 있도록 selector 준비.
  selector = document.getElementById("song_list");
  if (initialSelect >= song_list.length)    // index overflow 방지.
    initialSelect = 0;
  for (var i=0; i<song_list.length; i++) {
    var item = document.createElement("option");
    item.text = song_list[i];
    item.value = file_list[i];
    if (i == initialSelect) 
      item.selected="selected";
    selector.appendChild(item);
  }
  selector.onchange = function() {
    console.log("Song file - Changed : " + file_list[selector.selectedIndex] );
    scrollPosition = 0;
    xmlhttp.open("GET", file_list[selector.selectedIndex], true);
    xmlhttp.send();
  }

  ////  loading *.uke JSON data
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      song_data = JSON.parse(this.responseText);
      let title = document.getElementById("song_title");
      title.innerHTML = song_data.title;
      let comments = document.getElementById("comments");
      comments.innerHTML = song_data.comment;
      let dom_bpm = document.getElementById("bpm");
      dom_bpm.value = parseFloat(song_data.bpm);
      console.log("[][] BPM value set:" + dom_bpm.value + " (from:" + song_data.bpm + ")"  );
      let dom_offset = document.getElementById("offset");
      dom_offset.value = parseInt(song_data.start_offset);
      let dom_beat = document.getElementById("signature");
      dom_beat.value = song_data.basic_beat;
      console.log("[][] 박자:" + song_data.basic_beat );
      let edit_size = document.getElementById("quaver_mode");
      edit_size.selectedIndex = (song_data.editsize == 16)?1:0;    // default값 = seleted=1 = 8분음표 편집
      g_edit_size = (edit_size.selectedIndex == 0)?8:16;    // 8음표2개 or 16분음표4개
      console.log("[][] 편집단위:" + edit_size.value + ", 데이터:" + song_data.editsize + ", 변수값:" + g_edit_size );

      scrollPosition = 0;
      // 앨범thumbnail 파일 표시 .
      changeThumnail(song_data.thumbnail);
      console.log("썸네일:" + thumbnail.src  );
      // MP# 파일 로딩.
      audioTag = document.getElementById("playing_audio");
      if (song_data.source.length > 0) {
        console.log("음원파일:" + song_data.source + "("+song_data.source.length+")"+", loaded="+array_l.length );
        request_mp3(song_data.source);
        document.getElementById("loadMP3_file").innerHTML = song_data.source;
      } else {
        console.error("clear array_l. loaded="+array_l.length );
        array_l = [];
      }
      calc_note_size();
      change_speed(1.0);
      //  Drawing Tabulature
      resize_canvas( window.innerWidth-40);
    }
  };
  xmlhttp.open("GET", file_list[initialSelect], true);
  xmlhttp.send();
}

function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  let regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

window.addEventListener("resize", window_resized);
function window_resized(event) {
  dlg_wnd = document.getElementsByClassName("dialog");
  console.log("num="+dlg_wnd.length);
  for (let i=0; i<dlg_wnd.length; i++) {
    let w = dlg_wnd[i].offsetWidth;
    let h = dlg_wnd[i].offsetHeight;
    dlg_wnd[i].style.left = (event.target.innerWidth-w)/2 + "px";
    dlg_wnd[i].style.top = "30px";     // (event.target.innerHeight-h-80)/2 + "px";    // 80은 그냥 조정값.
    console.log("i="+i+", width=" + w+", height=" + h );
  }

  console.log("resize window.." );
  resize_canvas (event.target.innerWidth-40 );
}

///////////////////////////////////////////////////////////////
//// 본격적인 Drawing 함수들의 시작.
///////////////////////////////////////////////////////////////

function resize_canvas(cnvs_width) {
  canvas_width = cnvs_width;
  canvas_height = (H_OFFSET_SLIDER+H_RULER+H_WAVEFORM+H_CHORD+H_NOTES+H_LYRIC+H_TECHNIC+H_STROKE+H_RULER);      //430;

  let edit_area = document.getElementById("edit_area");
  edit_area.width = cnvs_width;     // event.target.innerWidth-30;
  edit_area.height = canvas_height;
  edit_area.onmousedown = edit_mouseDown;
  edit_area.onmousemove = edit_mouseMove;
  edit_area.onmouseup = edit_mouseUp;
  edit_area.onwheel = edit_wheelScroll;
  // edit_area.onkeydown = edit_keyDown;
  // edit_area.onkeyup = edit_keyUp;

  // draw_tabulature();
  draw_editor();
}

const note_names = [  "G3", "G#3", "A3", "A#3", "B3",         // 낮은 음으로 G 현을 조정했을 경우..
                      "C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4", "A4", "A#4", "B4",
                      "C5", "C#5", "D5", "D#5", "E5", "F5", "F#5", "G5", "G#5", "A5", "A#5", "B5",
                      "C5", "C#5", "D5", "D#5", "E5" ];


const chord_name_table = [
  "C",   "Cm",   "C7",  "Cmaj7",  "Cm7",  "Cdim",  "Cm7b5",  "Caug",  "Csus4",  "C6",  "C9",  "Cmaj9",  "Cmmaj7",  "Cadd9",
  "C#",  "C#m",  "C#7", "C#maj7", "C#m7", "C#dim", "C#m7b5", "C#aug", "C#sus4", "C#6", "C#9", "C#maj9", "C#mmaj7", "C#add9",
  "D",   "Dm",   "D7",  "Dmaj7",  "Dm7",  "Ddim",  "Dm7b5",  "Daug",  "Dsus4",  "D6",  "D9",  "Dmaj9",  "Dmmaj7",  "Dadd9",
  "D#",  "D#m",  "D#7", "D#maj7", "D#m7", "D#dim", "D#m7b5", "D#aug", "D#sus4", "D#6", "D#9", "D#maj9", "D#mmaj7", "D#add9",
  "E",   "Em",   "E7",  "Emaj7",  "Em7",  "Edim",  "Em7b5",  "Eaug",  "Esus4",  "E6",  "E9",  "Emaj9",  "Emmaj7",  "Eadd9",
  "F",   "Fm",   "F7",  "Fmaj7",  "Fm7",  "Fdim",  "Fm7b5",  "Faug",  "Fsus4",  "F6",  "F9",  "Fmaj9",  "Fmmaj7",  "Fadd9",
  "F#",  "F#m",  "F#7", "F#maj7", "F#m7", "F#dim", "F#m7b5", "F#aug", "F#sus4", "F#6", "F#9", "F#maj9", "F#mmaj7", "F#add9",
  "G",   "Gm",   "G7",  "Gmaj7",  "Gm7",  "Gdim",  "Gm7b5",  "Gaug",  "Gsus4",  "G6",  "G9",  "Gmaj9",  "Gmmaj7",  "Gadd9",
  "G#",  "G#m",  "G#7", "G#maj7", "G#m7", "G#dim", "G#m7b5", "G#aug", "G#sus4", "G#6", "G#9", "G#maj9", "G#mmaj7", "G#add9",
  "A",   "Am",   "A7",  "Amaj7",  "Am7",  "Adim",  "Am7b5",  "Aaug",  "Asus4",  "A6",  "A9",  "Amaj9",  "Ammaj7",  "Aadd9",
  "A#",  "A#m",  "A#7", "A#maj7", "A#m7", "A#dim", "A#m7b5", "A#aug", "A#sus4", "A#6", "A#9", "A#maj9", "A#mmaj7", "A#add9",
  "B",   "Bm",   "B7",  "Bmaj7",  "Bm7",  "Bdim",  "Bm7b5",  "Baug",  "Bsus4",  "B6",  "B9",  "Bmaj9",  "Bmmaj7",  "Badd9",
];

const chord_finger_a_table = [
  "3a", "3a", "1i", "2", "3i", "3", "3", "3", "3", "0", "1", "2", "3", "5",
  "4", "1", "2", "3", "2", "1", "2", "0", "4", "1", "2", "3", "3", "4",
  "0", "0", "3", "4", "3", "3", "3", "1", "0", "3", "3", "4", "4", "5",
  "1", "1", "4", "5", "4", "3", "4", "2", "1", "3", "1", "1", "5", "1",
  "2", "2i", "2", "2", "2", "1", "1", "4", "2", "2", "2", "2", "2", "2",
  "0", "3", "3", "0", "3", "2", "2", "0", "1", "3", "3", "0", "3", "0",
  "1", "0", "4", "4", "4", "3", "3", "1", "4", "4", "4", "1", "4", "1",
  "2", "1", "2", "2", "1", "1", "1", "2", "3", "2", "2", "2", "1", "2",
  "3", "2", "3", "3", "2", "2", "2", "3", "4", "3", "3", "3", "2", "3",
  "0", "0", "0", "0", "0", "3", "3", "0", "0", "4", "2", "2", "0", "2",
  "1", "1", "1", "0", "1", "1", "1", "1", "1", "1", "3", "3", "1", "3",
  "2", "2", "2", "1", "2", "2", "2", "2", "2", "2", "4", "4", "2", "4",
];
const chord_finger_e_table = [
  "0", "3m", "0", "0", "3i", "2", "2", "0", "1", "0", "0", "0", "3", "0",
  "1", "1", "1", "1", "0", "0", "0", "1", "4", "1", "1", "1", "0", "1",
  "2a", "1i", "2m", "2", "1", "1", "1", "2", "3", "2", "2", "2", "1", "2",
  "3", "2", "3", "3", "2", "2", "2", "3", "4", "3", "1", "1", "2", "1",
  "4", "3m", "0", "4", "0", "0", "0", "0", "5", "0", "2", "2", "0", "2",
  "1i", "1", "1", "0", "1", "1", "1", "1", "1", "1", "3", "0", "1", "1",
  "2", "2", "2", "0", "2", "2", "2", "2", "0", "2", "4", "1", "2", "2",
  "3", "3", "1", "2", "1", "0", "1", "3", "3", "0", "1", "2", "2", "3",
  "4", "4", "2", "3", "2", "1", "2", "0", "4", "1", "2", "3", "3", "4",
  "0", "0", "0", "0", "0", "2", "3", "1", "0", "2", "0", "0", "0", "0",
  "1", "1", "1", "1", "1", "0", "0", "2", "1", "1", "1", "1", "1", "1",
  "2", "2", "2", "2", "2", "1", "1", "3", "2", "2", "2", "2", "2", "2",
];
const chord_finger_c_table = [
  "0", "3i", "0", "0", "3i", "2", "2", "0", "1", "0", "0", "0", "3", "0",
  "1", "1", "1", "1", "1", "1", "1", "1", "0", "1", "3", "3", "1", "3",
  "2m", "2a", "2", "2", "2", "2", "2", "2", "2", "2", "4", "4", "2", "4",
  "3", "3", "3", "3", "3", "3", "3", "3", "3", "3", "1", "2", "3", "3",
  "4", "4a", "2", "3", "2", "1", "2", "0", "4", "1", "2", "3", "3", "4",
  "0", "0", "3", "0", "3", "2", "3", "1", "0", "2", "3", "0", "4", "0",
  "1", "1", "4", "5", "4", "3", "4", "2", "0", "3", "4", "1", "5", "1",
  "2", "2", "2", "2", "2", "1", "1", "3", "2", "2", "2", "2", "2", "2",
  "3", "3", "3", "3", "3", "2", "2", "0", "3", "3", "3", "3", "3", "3",
  "1", "0", "1", "1", "0", "3", "3", "1", "2", "4", "1", "1", "0", "1",
  "2", "1", "2", "2", "1", "1", "1", "2", "3", "2", "2", "2", "1", "2",
  "3", "2", "3", "3", "2", "2", "2", "3", "4", "3", "3", "3", "2", "3",
];
const chord_finger_g_table = [
  "0", "0", "0", "0", "3i", "2", "3", "1", "0", "0", "0", "0", "4", "0",
  "1", "3", "1", "1", "1", "0", "0", "2", "0", "1", "1", "1", "1", "1",
  "2i", "2m", "2i", "2", "2", "1", "1", "3", "2", "2", "2", "2", "2", "2",
  "0", "3", "3", "3", "3", "2", "2", "0", "3", "3", "0", "0", "3", "0",
  "4", "0", "1", "3", "0", "0", "0", "1", "4", "1", "1", "1", "0", "4",
  "2m", "1", "2", "5", "1", "1", "1", "2", "3", "2", "2", "0", "1", "0",
  "3", "2", "3", "0", "2", "2", "2", "3", "0", "3", "3", "1", "2", "1",
  "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "2", "2", "0", "2",
  "5", "1", "1", "1", "1", "1", "1", "1", "1", "1", "3", "3", "1", "3",
  "2", "2", "0", "1", "0", "2", "2", "2", "2", "2", "0", "1", "1", "2",
  "3", "3", "1", "3", "1", "0", "1", "3", "3", "0", "1", "2", "2", "3",
  "4", "4", "2", "4", "2", "1", "2", "4", "4", "1", "2", "3", "3", "4",
];



////   1개의 화음을 표시
var draw_a_note = function(ctx, data, xpos, ypos) {
  var g, c, e, a;             // 플랫 정보
  var f_g, f_c, f_e, f_a;     // finger 정보 
  var c_g, c_c, c_e, c_a;     // 숫자의 색상 (y좌표) 컬러 값 (1=검지=green, 2=중지=Magenta, 3=약지=CYAN, 4=새끼=짙은파랑)

  data.tab.forEach(element => {
    switch(element.substr(0,1) ) {
      case "G":
        f_g = element.substr(-1);
        g = ( f_g >= 'a' ) ? element.substr(1,element.length-2) : element.substr(1);
        c_g = (f_g=='i')? 46 : (f_g=='m')? 31 : (f_g=='a')? 16 : (f_g=='c')? 61 : 1 ;
        break;
      case "C":
        f_c = element.substr(-1);
        c = ( f_c >= 'a' ) ? element.substr(1,element.length-2) : element.substr(1);
        c_c = (f_c=='i')? 46 : (f_c=='m')? 31 : (f_c=='a')? 16 : (f_c=='c')? 61 : 1 ; 
        break;
      case "E":
        f_e = element.substr(-1);
        e = ( f_e >= 'a' ) ? element.substr(1,element.length-2) : element.substr(1);
        c_e = (f_e=='i')? 46 : (f_e=='m')? 31 : (f_e=='a')? 16 : (f_e=='c')? 61 : 1 ; 
        break;
      case "A":
        f_a = element.substr(-1);
        a = ( f_a >= 'a' ) ? element.substr(1,element.length-2) : element.substr(1);
        c_a = (f_a=='i')? 46 : (f_a=='m')? 31 : (f_a=='a')? 16 : (f_a=='c')? 61 : 1 ; 
        break;
    }
  });

  // 마디 구분 표시
  if (data.technic) {
    if (data.technic.indexOf('|') >= 0) {   // 마디 표시
      ctx.fillRect(xpos-2, ypos+TAB_LINE_A_Y, 2, (TAB_LINE_G_Y-TAB_LINE_A_Y) );
    }
    // if ( data.technic.indexOf('3') >= 0 ) {     // 셋 잇단음표를 표시
    //   ctx.drawImage(note_icon, 339, 92, 14,8,  xpos+8, ypos+STROKE_ICON_Y+8,  14,8);
    // }
    // if ( data.technic.indexOf('s') >= 0 ) {     // 이음줄 (부드럽게 손가락 이동) 표시
    // }
  }

  // 스트로크 방향 및 Hammering-On, Pulling-Off, Slide 등을 표시 
  if (data.stroke) {         // 스트로크를 표시
    if ( data.stroke.indexOf('D') >= 0 ) {
      ctx.drawImage(note_icon, 339, 64, 14,26,  xpos, ypos+STROKE_ICON_Y,  14,26);
    } else if ( data.stroke.indexOf('U') >= 0 ) {
      ctx.drawImage(note_icon, 354, 64, 14,26,  xpos, ypos+STROKE_ICON_Y,  14,26);
    } 
    if ( data.stroke.indexOf('H') >= 0 ) {
      ctx.drawImage(note_icon, 369, 65, 11,15,  xpos+16, ypos+STROKE_ICON_Y,  11,15);
    } else if ( data.stroke.indexOf('P') >= 0 ) {
      ctx.drawImage(note_icon, 382, 65, 11,15,  xpos+16, ypos+STROKE_ICON_Y,  11,15);
    } else if (data.stroke.indexOf('s') >= 0 ) {    // 슬라이드를 표시
      ctx.drawImage(note_icon, 339, 92, 14,8,  xpos+8, ypos+STROKE_ICON_Y+8,  14,8);
    }
    if ( data.stroke.indexOf('~') >= 0 ) {
      ctx.drawImage(note_icon, 369, 0, 9, 63,  xpos+14, ypos+TAB_LINE_A_Y-20,  9, H_NOTES);
    }
  }

  // 화음 및 음표에 따른 연주 플랫 정보를 표시. 
  if (g != undefined ) {
    ctx.drawImage(note_icon, g*18, c_g, 15, 12,   xpos, ypos+TAB_LINE_G_Y-8, 16, 14);     // src_x, y, w, h ,  dst x, y, w, h
  }
  if (c != undefined ) {
    ctx.drawImage(note_icon, c*18, c_c, 15, 12,   xpos, ypos+TAB_LINE_C_Y-8, 16, 14);
  }
  if (e != undefined ) {
    ctx.drawImage(note_icon, e*18, c_e, 15, 12,   xpos, ypos+TAB_LINE_E_Y-8, 16, 14);
  }
  if (a != undefined ) {
    ctx.drawImage(note_icon, a*18, c_a, 15, 12,   xpos, ypos+TAB_LINE_A_Y-8, 16, 14);
  }
}

var g_sampleRate = 0;        // 1초당 sound sample 수.. --> 이 값에 따라 grid 의 pixel 간격이 달라질 수 있으므로 주의.
var g_totalMsec = 0;         // 음악 전체의 길이 (msec단위)

var signature_divider = 8;   // 마디 당 quaver 수, default 는 4/4 박자, 8분음표
var g_edit_size = 8;         // 8=quaver(8분음표), 16=semi-quaver(16분음표)
var g_bpm = 60;
var g_offset = 0;
var g_numSmp_per_px = 256;     // number of samples per pixel;        --> 1, 2, 4, 8, 16, 32, 64, 128, .. <-- 확대/축소 배율

var g_numSmp_per_quaver = (g_sampleRate*30) / g_bpm;      // 기준 음표(8분음표or16분음표)가 차지하는 가로 pixel 크기    // var grid_width = 20;        // 1개 단위음 (8분음표 or 16분음표) 크기 - BPM 및 확대/축소에 따라, 박자(signature)에 따라 크기가 변경된다.
var g_numPx_per_quaver = g_numSmp_per_quaver / g_numSmp_per_px;   // 마우스 드래그로 이동 시킬 때의 위치 표시용, 1개 음표 크기 (pixel)
var g_ms_for_quaver;  // = parseInt((g_numSmp_per_quaver*1000)/g_sampleRate);

var moving_note_idx = -1;     // 마우스 드래그로 음표를 이동시킬 때의 index.
var note_idx_editing = -1;    // Dialog 에서 편집중인 음표의 index.


//// MP3 데이터를 로딩 하여 디코딩 요청.
function request_mp3(filename) {
  stop_song();
  if (filename) {       //  loading *.MP3 data :   refer : https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Sending_and_Receiving_Binary_Data
    array_l = [];
    audioTag.src = "http://ccash.gonetis.com:88/uke_blog/data/"+filename;
    if (!filename || filename.length == 0) {
      console.log("음원파일을 지정하지 않았습니다..");
      return;
    } else {
      console.log("음원파일 = " + filename);
    }
    var oReq = new XMLHttpRequest();
    oReq.open("GET", "http://ccash.gonetis.com:88/uke_blog/data/"+filename, true);
    oReq.responseType = "arraybuffer";
    oReq.onload = function() {
      console.log("xmlhttpReq... sftp://ccash.gonetis.com:/home/ahnsik/ukulele/"+filename);
      if (this.readyState != 4 || this.status != 200) {
        console.log("... readyState=" + this.readyState + ", status="+this.status );
        return;
      }
      let mp3Buffer = oReq.response; // Note: not oReq.responseText
      console.log("start decode MP3");
      mp3Decode(mp3Buffer);         // 디코딩 된 mp3 데이터는 0번채널을 array_l 라는 버퍼에 float32 데이터로 저장해 담아 둔다.
      /*if (array_l && array_l.length > 0) {
        console.log("[][] starting MP3 draw...");
      } else {
        console.log("[][] MP3 decode fail or length==" + (array_l)?array_l.length:"null" );
      }*/
    };
    oReq.send(null);
    console.log("--> request_end:" + filename );
  }
}

//// MP3 데이터를 디코딩 하여 array_l 버퍼에 저장.
async function mp3Decode(mp3Buffer) {
  const ac = new AudioContext();
  const audioBuf =  await ac.decodeAudioData(mp3Buffer);
  console.log("[][] ac.decodeAudioData:"+audioBuf.length+" bytes, channels="+audioBuf.numberOfChannels+", sampleRate="+audioBuf.sampleRate );    // refer AudioBuffer: https://developer.mozilla.org/en-US/docs/Web/API/AudioBuffer
  g_sampleRate = audioBuf.sampleRate;
  g_totalMsec = audioBuf.duration;
  let float32Array_l = audioBuf.getChannelData(0);
  let i=0;
  let wavefrom_size = parseInt( (H_WAVEFORM-1)/2 );
  const length = float32Array_l.length;
  array_l = [];
  while(i<length) {
    array_l.push( float32Array_l[i] * wavefrom_size );
    /*array_r.push( float32Array_r.slice(i, i+chunkSize).reduce(function(total,value) {
      return Math.max(total, Math.abs(value));
    }));*/
    i++;
  }  
  draw_editor();
}

///////////////////////////////////////////////////////////////
//// 편집화면영역(waveform, TAB, etc..)을 Drawing
///////////////////////////////////////////////////////////////
var draw_editor = () => {
  let canvas=document.getElementById("edit_area");
  canvas.width = canvas_width;
  canvas.height = canvas_height;
  let ctx = canvas.getContext("2d");
  ctx.textBaseline = 'top';
  ctx.fillStyle = 'white';
  ctx.clearRect(0, 0, canvas_width, canvas_height);
  ctx.imageSmoothingEnabled= true;

  calc_note_size();

  draw_offset_slider(ctx, 0);   // 옵셋 조정 막대
  draw_ruler(ctx, H_OFFSET_SLIDER);   // 상단 : 줄자
  draw_ruler(ctx, canvas_height-H_RULER);   // 하단 : 줄자

  draw_waveform(ctx, H_OFFSET_SLIDER+H_RULER, H_WAVEFORM);

  ctx.fillStyle = '#888';
  ctx.font = CANVAS_FONT_TINY;
  ctx.fillText("chord:", 26, H_OFFSET_SLIDER+H_RULER+H_WAVEFORM+H_CHORD/2, 120);
  ctx.drawImage(note_icon, 19*18, 0, 28, 63,   START_XPOS-28, H_OFFSET_SLIDER+H_RULER+H_WAVEFORM+H_CHORD+TAB_LINE_A_Y-8, 28, 63);     // src_x, y, w, h ,  dst x, y, w, h
  ctx.fillText("lyric:", 30, H_OFFSET_SLIDER+H_RULER+H_WAVEFORM+H_CHORD+H_NOTES+H_LYRIC/2, 120);
  ctx.fillText("stroke:", 20, H_OFFSET_SLIDER+H_RULER+H_WAVEFORM+H_LYRIC+H_CHORD+H_NOTES+H_STROKE/2, 120);
  ctx.fillText("technic:", 20, H_OFFSET_SLIDER+H_RULER+H_WAVEFORM+H_LYRIC+H_CHORD+H_NOTES+H_STROKE+H_TECHNIC/2, 120);
}

var draw_offset_slider = (ctx, ypos) => {
  let color_backup = ctx.fillStyle;
  let font_backup = ctx.font;

  ctx.fillStyle = '#CCC';
  ctx.fillRect(START_XPOS, ypos, canvas_width, 2);
  ctx.fillStyle = '#DDD';
  ctx.fillRect(START_XPOS, ypos+2, canvas_width, 6);
  ctx.fillStyle = '#CCC';
  ctx.fillRect(START_XPOS, ypos+8, canvas_width, 4);
  ctx.fillStyle = '#888';
  ctx.font = CANVAS_FONT_TINY;
  ctx.fillText("offset_slider:", 0, 0, START_XPOS);

  /* // 커서 위치가 편집영역 안에 들어오게 되면 스크롤 가능 표시를 해 준다.
  if ( (cursor_ypos>ypos)&&(cursor_ypos<ypos+12) ) {
    ctx.font = CANVAS_FONT_SMALLER; //'26px SeoulNamsan canvas';
    ctx.fillText("◀ ▶", cursor_xpos, ypos, 8);
  } */
  ctx.font = font_backup;
  ctx.fillStyle = color_backup;
}

var draw_ruler = (ctx, ypos) => {
  let temp_index;

  let color_backup = ctx.fillStyle;
  let font_backup = ctx.font;
  ctx.fillStyle = '#888';
  ctx.font = CANVAS_FONT_TINY;

  let grid_time;
  let time_string;

  //// TODO:  zoom 레벨에 따라, 0.25초, 0.5초, 1초 등.. 초 단위 표시로 바꿀 것. 
  for (var i=0; i<(canvas_width-START_XPOS); i++)  {
    temp_index = (i*g_numSmp_per_px)+scrollPosition;
    if ( (temp_index % g_numSmp_per_quaver) < g_numSmp_per_px ) {    
      ctx.fillRect(START_XPOS+i, ypos+4, 2, 10);
      grid_time = parseInt(i*g_numSmp_per_px)+parseInt(scrollPosition) / parseInt(g_sampleRate);
      time_string = ""+Math.trunc(grid_time/60000)+":"+Math.trunc((grid_time%60000)/1000)+"."+Math.trunc(grid_time%1000);
      ctx.fillText(time_string, START_XPOS+i+2, ypos);  // "0:00.000"
    }
  }


  ctx.fillText("playing time:", 0, ypos, START_XPOS);
  ctx.font = font_backup;
  ctx.fillStyle = color_backup;
}

//// 디코딩 된 MP3 (waveform) 데이터를 캔버스에 Draw 한다. 
var draw_waveform = (ctx, ypos, height) => {
  let color_backup = ctx.fillStyle;
  let font_backup = ctx.font;
  ctx.fillStyle = '#888';
  ctx.font = CANVAS_FONT_TINY;
  ctx.fillText("waveform:", 10, H_OFFSET_SLIDER+H_RULER+H_WAVEFORM/2, 120);
  if (array_l && array_l.length>0) {    // MP3 디코딩 된 데이터가 있으면 그린다. 없으면 안그림.
    waveformDraw(ctx, ypos, array_l);
  } else {
    ctx.font = CANVAS_FONT_BIGGER; //'26px SeoulNamsan canvas';
    ctx.fillText("No waveform data.", 120, 90, 820);
  }

  ctx.font = font_backup;
  ctx.fillStyle = color_backup;
};

var waveformDraw = (ctx, ypos, wavBuffer) => {
  let i, j, min, max, temp_index, index_withOffset, value;
  let wavefrom_size = parseInt( (H_WAVEFORM-1)/2 );
  let waveform_offset = parseInt(g_offset * g_sampleRate/1000);
  const editor_height = H_TECHNIC+H_LYRIC+H_CHORD+H_NOTES+H_STROKE;

  let current_playing_index = audioTag.currentTime*g_sampleRate + waveform_offset;

  if ( ! audioTag.paused ) {    // 재생 중인 동안에는, Playing Position 위치에 맞게 자동으로 scrolling..
    let leftScrollLimit = 0;      /// -(START_XPOS*g_numSmp_per_px);    // TODO: 그래프에서 왼쪽에 label 표시 영역 처리해야 하는데...
    let rightScrollLimit = ((canvas_width-START_XPOS)*g_numSmp_per_px*0.4);   // 화면 크기의 40%진행 위치
    if ( (current_playing_index-scrollPosition) > rightScrollLimit ) {
      scrollPosition = parseInt(current_playing_index - rightScrollLimit ) ;
    }
    if ( (current_playing_index-scrollPosition) < leftScrollLimit ) {
      scrollPosition = parseInt(current_playing_index);
    }
  }

  /* BG만 먼저 그려주고 */
  for ( i = 0; i< (canvas_width-START_XPOS); i++ ) {
    temp_index = (i*g_numSmp_per_px)+scrollPosition;
    index_withOffset = temp_index +waveform_offset;
    // 재생 중인 동안에는, Playing Position 위치에 맞게 자동으로 scrolling..
    // 박자 구분 grid background 그리기
    if ( (index_withOffset % g_numSmp_per_quaver) < g_numSmp_per_px ) {    // 기준음표 1개 길이마다 grid 눈금으로 표시.    // if ( (parseInt(temp_index) % parseInt(g_numSmp_per_quaver)) < g_numSmp_per_px ) {    // 기준음표 1개 길이마다 grid 눈금으로 표시.
      ctx.fillStyle = QUAVER_GRID_COLOR;
      ctx.fillRect(START_XPOS+i+0.5, ypos, 1, H_WAVEFORM );
      // ctx.fillStyle = QUAVER_GRID_COLOR;
      ctx.fillRect(START_XPOS+i+0.5, ypos+H_WAVEFORM, 1, editor_height);
    } else if ( (parseInt(index_withOffset / g_numSmp_per_quaver) % signature_divider ) === 0 ) { // 각 마디별로 첫번째 마디인 경우에 배경색 변경.
      ctx.fillStyle = QUAVER_FIRST_COLOR;
      ctx.fillRect(START_XPOS+i+0.5, ypos, 1, H_WAVEFORM );
      ctx.fillStyle = '#CEC';
      ctx.fillRect(START_XPOS+i+0.5, ypos+H_WAVEFORM, 1, editor_height);
    } else {
      ctx.fillStyle = QUAVER_BG_COLOR;
      ctx.fillRect(START_XPOS+i+0.5, ypos, 1, H_WAVEFORM );
      ctx.fillStyle = '#DFD';
      ctx.fillRect(START_XPOS+i+0.5, ypos+H_WAVEFORM, 1, editor_height);
    }
    ctx.fillStyle = 'black';
    ctx.fillRect(START_XPOS+i+0.5, ypos+H_WAVEFORM+H_CHORD+TAB_LINE_A_Y, 1, 2);
    ctx.fillRect(START_XPOS+i+0.5, ypos+H_WAVEFORM+H_CHORD+TAB_LINE_E_Y, 1, 2);
    ctx.fillRect(START_XPOS+i+0.5, ypos+H_WAVEFORM+H_CHORD+TAB_LINE_C_Y, 1, 2);
    ctx.fillRect(START_XPOS+i+0.5, ypos+H_WAVEFORM+H_CHORD+TAB_LINE_G_Y, 1, 2);
  }

  /* 음파 Waveform과 데이터를 나중에 그려 줘야 함. - 동시에 그리면 그려진 글자가 지워지므로. */
  for ( i = 0; i< (canvas_width-START_XPOS); i++ ) {
    min= wavefrom_size; max= -wavefrom_size;
    temp_index = (i*g_numSmp_per_px)+scrollPosition;
    index_withOffset = temp_index +waveform_offset;
    if ( (typeof(temp_index)!="number") || 
          (typeof(scrollPosition)!="number") ||
          (typeof(waveform_offset) != "number") ) {
      console.error ( "typeof temp_index="+typeof(temp_index)+ ", typeof scrollPosition="+typeof(scrollPosition)+ ",typeof g_offset="+typeof(waveform_offset) );
    }
    // min-max 계산
    for ( j=0; j<g_numSmp_per_px; j++) {
      value = wavBuffer[temp_index +j ];
      if ( value >= max)
        max = value;      //parseInt(value);
      if ( value <= min)
        min = value;      //parseInt(value);
    }

    // WAVE 파형 그리기.
    if ( index_withOffset < current_playing_index ) { 
      ctx.strokeStyle = WAVEFORM_COLOR_PAST;
    } else {
      if ( ( parseInt(index_withOffset/g_sampleRate) % 2) == 0 ) {   // 초단위 구분을 위한 색깔 변화
        ctx.strokeStyle = WAVEFORM_COLOR_EVEN;
      } else {
        ctx.strokeStyle = WAVEFORM_COLOR_ODD;
      }
    }
    ctx.beginPath();
    ctx.moveTo( START_XPOS+ i+0.5, ypos+100 + min );
    ctx.lineTo( START_XPOS+ i+0.5, ypos+100 + max );
    ctx.stroke();
  }

  ctx.font = CANVAS_FONT_BASIC;
  let notes = song_data.notes;
  for (j=0; j<notes.length; j++) {
    let note_ts = notes[j].timestamp;
    let xpos = (((note_ts-g_offset)*g_sampleRate/1000)-scrollPosition) / g_numSmp_per_px; 
    if (xpos < 0) continue;
    if (xpos > canvas_width) continue;

    if (j===moving_note_idx) {   // 선택한 index 위치에 있으면 테두리에 사각형을 그려 준다.
      ctx.strokeStyle = "cyan";
      ctx.strokeRect(START_XPOS+xpos+0.5, H_WAVEFORM+H_OFFSET_SLIDER+H_RULER, g_numPx_per_quaver, H_CHORD+H_NOTES+H_LYRIC+H_STROKE+H_TECHNIC );
    }

    if (notes[j].chord) {
      let chord_index = chord_name_table.indexOf(notes[j].chord);
      ctx.drawImage(chord_icon, (chord_index%14)*50, parseInt(chord_index/14)*54, 49,53,  START_XPOS+xpos, H_WAVEFORM+H_OFFSET_SLIDER+H_RULER,  49, 53);
    }
    if (notes[j].tab) {
      ctx.fillStyle = CHORD_TEXT_COLOR;
      draw_a_note(ctx, notes[j], START_XPOS+xpos, H_OFFSET_SLIDER+H_RULER+H_CHORD+H_WAVEFORM );
    }
    if (notes[j].lyric) {
      ctx.fillStyle = LYRIC_TEXT_COLOR;
      ctx.fillText("" + notes[j].lyric, START_XPOS+xpos, H_WAVEFORM+H_CHORD+H_NOTES+H_OFFSET_SLIDER+H_RULER+6 );
    }
    if (notes[j].stroke) {
      if (notes[j].stroke !== "~" ) {    // 디리링~ ~ 마크는 안 그려도 됨 - TAB표시에 img로 그릴 거니까..
        ctx.fillStyle = LYRIC_TEXT_COLOR;
        ctx.fillText("" + notes[j].stroke, START_XPOS+xpos, H_OFFSET_SLIDER+H_RULER+H_WAVEFORM+H_CHORD+H_NOTES+H_LYRIC );
      }
    }
    if (notes[j].technic) {
      if (notes[j].technic !== "|" ) {    // 마디 구분은 안 그려도 됨.
        ctx.fillStyle = LYRIC_TEXT_COLOR;
        ctx.fillText("" + notes[j].technic, START_XPOS+xpos, H_OFFSET_SLIDER+H_RULER+H_WAVEFORM+H_CHORD+H_NOTES+H_LYRIC+H_STROKE );
        console.log("[][] technic:"+notes[j].technic+ ", x="+(START_XPOS+xpos) );
      }
    }
  }

}



var play_handler = null;
var speed_multiplier = 1.0;

var play_song = () => {
  if ( audioTag.paused ) {   
    audioTag.play();
    document.getElementById("play_song").src = "common/pause.svg" ;
    play_handler = setInterval( function() {
      draw_editor();
      if (audioTag.ended) {
        stop_song();
      }
    }, 50);
  } else {
    audioTag.pause();
    document.getElementById("play_song").src = "common/play.svg" ;
    clearInterval(play_handler);
    play_handler = null;
    draw_editor();
  }
};

var stop_song = () => {
  audioTag.pause();
  audioTag.currentTime = 0;
  document.getElementById("play_song").src = "common/play.svg" ;
  clearInterval(play_handler);
  play_handler = null;
  draw_editor();
}

var goto_head = () => {
  audioTag.currentTime = 0;
  scrollPosition = 0;
  draw_editor();
}

var rewind_10sec = () => {
  if (audioTag.currentTime > 10) {
    audioTag.currentTime = audioTag.currentTime-10;
  } else {
    audioTag.currentTime = 0;
  }
  draw_editor();
}

var change_speed = (speed) => {
  console.log("change speed multiply:" + speed);
  speed_multiplier = speed;

  let btn_0_5 = document.getElementById("speed_0_5");  btn_0_5.src = "common/_slow0.5.svg";
  let btn_0_75 = document.getElementById("speed_0_75");  btn_0_75.src = "common/_slow0.75.svg";
  let btn_1_0 = document.getElementById("speed_1_0");  btn_1_0.src = "common/_ff1.0.svg";
  let btn_1_25 = document.getElementById("speed_1_25");  btn_1_25.src = "common/_ff1.25.svg";
  let btn_1_5 = document.getElementById("speed_1_5");  btn_1_5.src = "common/_ff1.5.svg";
  let btn_2_0 = document.getElementById("speed_2_0");  btn_2_0.src = "common/_ff2.0.svg";
  switch(speed) {
    case 0.5:
      btn_0_5.src = "common/slow0.5.svg";      break;
    case 0.75:
      btn_0_75.src = "common/slow0.75.svg";      break;
    case 1.0:
      btn_1_0.src = "common/ff1.0.svg";      break;
    case 1.25:
      btn_1_25.src = "common/ff1.25.svg";      break;
    case 1.5:
      btn_1_5.src = "common/ff1.5.svg";      break;
    case 2.0:
      btn_2_0.src = "common/ff2.0.svg";      break;
  }
  audioTag.playbackRate = speed_multiplier;
}

var zoom_in = function () {
  if (g_numSmp_per_px > 2) {
    g_numSmp_per_px = g_numSmp_per_px/2;
    let dom_offset = document.getElementById("offset");
    dom_offset.step = parseInt(g_numSmp_per_px*1000/g_sampleRate);
    draw_editor();
  }
  console.log("g_numSmp_per_px :" + g_numSmp_per_px);
}

var zoom_out = function () {
  if (g_numSmp_per_px < 2048 ) {
    g_numSmp_per_px = g_numSmp_per_px*2;
    let dom_offset = document.getElementById("offset");
    dom_offset.step = parseInt(g_numSmp_per_px*1000/g_sampleRate);
    draw_editor();
  }
  console.log("g_numSmp_per_px :" + g_numSmp_per_px);
}

/*  BPM, 
  - 기준: 60 bpm, 4/4박자 를 가정했을 때,  1초당 sample 수는 sampleRate 이므로, 
    --> 8분음표(note) 단위하나(=numSmp_quaver)의 크기는..  sample_rate / 2 만큼의 sample갯수이어야 한다. (1초=8분음표2개)
    --> numSmp_quaver = g_sampleRate/2  가 된다.
    --> 그럼, qauver 당 pixel 수는 numSmp_quaver / g_numSmp_per_px  가 된다. 
       ==> g_numPx_per_quaver = (g_sampleRate/2) / g_numSmp_per_px

  // 초당8분음표샘플수 = g_sampleRate / 2;   // 60bpm일때
  // 초당8분음표샘플수 = (g_sampleRate/2) * bpm / 60;   // 80bpm일때
  // 1초너비 = (g_sampleRate/g_numSmp_per_px) 개의 픽셀.
  // 8분음표1개의픽셀 = 1초너비/초당8분음표샘플수 = (g_sampleRate/g_numSmp_per_px) / ((g_sampleRate/2) * bpm / 60) ; 
  //           ==>  (bpm * 초당8분음표갯수) / g_numSmp_per_px;
  // g_numPx_per_quaver = (g_sampleRate/2) / g_numSmp_per_px ;
  // console.log("[][] check: g_numSmp_per_px="+g_numSmp_per_px+", g_numPx_per_quaver="+g_numPx_per_quaver);
*/

var calc_note_size = () => {   // BPM, 편집단위, 박자 값으로 grid 크기를 결정.
  g_bpm = parseInt(document.getElementById("bpm").value);
  song_data.bpm = g_bpm;
  g_offset = parseInt(document.getElementById("offset").value);
  song_data.start_offset = g_offset;
  g_edit_size = song_data.editsize = (document.getElementById("quaver_mode").selectedIndex == 0)?8:16;    // 8음표2개 or 16분음표4개
  g_numSmp_per_quaver = (g_sampleRate*(30*8/g_edit_size) ) / g_bpm;
  g_numPx_per_quaver = g_numSmp_per_quaver / g_numSmp_per_px ;
  g_ms_for_quaver = parseInt((g_numSmp_per_quaver*1000)/g_sampleRate);

  let _sign = document.getElementById("signature").value;
  song_data.basic_beat = _sign;

  switch(_sign) {       // 1마디에 들어갈 음표 갯수
    case "2/4":
      signature_divider = g_edit_size / 2;   // (8분음표는 4개, 16분 음표는 8개)
      break;
    case "3/4":
      signature_divider = g_edit_size*3 / 4;   // (8분음표는 6개, 16분 음표는 12개)
      break;
    case "6/8":
      signature_divider = g_edit_size*6 / 8;   // (8분음표는 6개, 16분 음표는 12개)
      break;
    case "4/4":
      signature_divider = g_edit_size;         // (8분음표는 8개, 16분 음표는 16개)
      break;
    default:
      signature_divider = parseInt( g_edit_size * _sign.split('/')[0] / _sign.split('/')[1] );
      console.log("_sign="+_sign+ ", split[0]="+parseInt(_sign.split('/')[0])+ ", divider=" + signature_divider );
      break;
  }
}

var quaver_changed = () => {
  g_edit_size = (document.getElementById("quaver_mode").selectedIndex == 0)?8:16;    // 8음표2개 or 16분음표4개
  console.log("편집단위:" + g_edit_size + "분음표로 편집");
  song_data.editsize = g_edit_size;
  calc_note_size();
  draw_editor();
}
var bpm_changed = () => {
  g_bpm = document.getElementById("bpm").value;
  console.log("BPM:" + g_bpm);
  calc_note_size();
  draw_editor();
}
var offset_changed = () => {
  g_offset = parseInt(document.getElementById("offset").value);
  console.log("playing offset:" + g_offset+", scrollPosition="+scrollPosition);
  calc_note_size();
  draw_editor();
}
var signature_changed = () => {
  let value = document.getElementById("signature").value;
  console.log("Signature:" + value);
  calc_note_size();
  draw_editor();
}


var last_posX=0, last_posY=0;
var last_timeStamp = 0;
var scroll_x = 0, prev_position=0;
var click_pos = null;
var isClicked = false;
var isScrollMode = false;
var isTsMoved = false;
/*var isShiftMode = false;

var edit_keyDown = (e) => {
  console.log("keydown : shift is " + e.isshiftKey );
  if (e.isshiftKey)
    isShiftMode = true;
}
var edit_keyUp = (e) => {
  console.log("keyup : shift is " + e.isshiftKey );
  if (e.isshiftKey)
    isShiftMode = false;
}
*/
var edit_mouseDown = (e) => {
  let canvas = document.getElementById("edit_area");
  const rect = canvas.getBoundingClientRect();
  last_posX = e.clientX - rect.left;
  last_posY = e.clientY - rect.top;

  if (last_posY < (H_OFFSET_SLIDER+H_RULER+H_WAVEFORM) ) {
    isScrollMode = true;
    last_timeStamp = parseInt(document.getElementById("timeStamp_input").value);
    scroll_x = 0;
    prev_position = scrollPosition;
  } else {
    isScrollMode = false;
    let temp_idx = (last_posX-START_XPOS)*g_numSmp_per_px+scrollPosition;
    let clicked_ts = parseInt(temp_idx*1000/g_sampleRate+g_offset);
    let note_ts = parseInt(clicked_ts/g_ms_for_quaver)*g_ms_for_quaver;
    moving_note_idx = find_note_index(note_ts, note_ts+g_ms_for_quaver );
    // if ( moving_note_idx !== -1) {
    //   console.log (" --- clicked TS="+note_ts );
    // }
  }

  isClicked = true;
  isTsMoved = false;
  e.preventDefault();
}
var edit_mouseMove = (e) => {
  // console.log("is shift key pressed? " + e.shiftKey );

  if (isClicked) {
    let canvas = document.getElementById("edit_area");
    const rect = canvas.getBoundingClientRect();
    let cursor_x = e.clientX - rect.left;
    let cursor_y = e.clientY - rect.top;

    if (isScrollMode) {
        scroll_x = (cursor_x-last_posX)*g_numSmp_per_px;
        scrollPosition = prev_position-scroll_x;
      // }
    } else {
      if (moving_note_idx !== -1) {    // 만약 뭔가 데이터를 편집 중이라면, = Dialog 가 표시된 상태라면,
        console.log("선택된 note 를 drag 해서 이동시킨다");
        let temp_idx = (cursor_x-START_XPOS)*g_numSmp_per_px+scrollPosition;
        let clicked_ts = parseInt(temp_idx*1000/g_sampleRate+g_offset);
        let note_ts = parseInt(clicked_ts/g_ms_for_quaver)*g_ms_for_quaver;
        if (e.altKey) {     // ALT 키가 눌려 있을 때에는, Grid 에 고정하지 않는다.
          note_ts = clicked_ts;
        }
        if (e.shiftKey) {   // 뒤에 있는 모든 index의 timeStamp들을 같은 크기 만큼 함께 조정한다.
          console.log("All timestamp will be changed");
          let notes = song_data.notes;
          let diff = (note_ts - notes[moving_note_idx].timestamp);
          for (let i = moving_note_idx; i< notes.length; i++) {
            notes[i].timestamp += diff;
          }
        } else {
          song_data.notes[moving_note_idx].timestamp = note_ts;
        }
        isTsMoved = true;
        // } else {
      }
    }
    draw_editor();
  }
  e.preventDefault();
}
var edit_mouseUp = (e) => {
  last_posX = 0;
  last_posY = 0;
  last_timeStamp = 0;

  if (scrollPosition === prev_position) {   // 스크롤 되지 않았음. note 편집.
    if (moving_note_idx !== -1) {    // TS 값을 조정 중이었다면, 
      // document.getElementById("timeStamp_input").value = last_timeStamp+time_diff;
      console.log("여기에서는 새로운 음을 편집하게 될 것?");
    } else {
      let canvas = document.getElementById("edit_area");
      const rect = canvas.getBoundingClientRect();
      let cursor_x = e.clientX - rect.left;
      // let cursor_y = e.clientY - rect.top;
      if (cursor_x > START_XPOS) {
        // console.log("clicked xpos="+cursor_x+", clicked_ts:" + (((cursor_x-START_XPOS)*g_numSmp_per_px*1000+scrollPosition*1000)/g_sampleRate+g_offset) + ", g_offset:" + g_offset );
        let temp_idx = (cursor_x-START_XPOS)*g_numSmp_per_px+scrollPosition;
        let clicked_ts = parseInt(temp_idx*1000/g_sampleRate+g_offset);
        console.log("clicked xpos="+cursor_x+", clicked_ts:"+clicked_ts );
        open_note_edit_dlg(clicked_ts);
      }
      console.log("분명히 편집 창을 열어야 할 텐데?");
    }
  } else {      // 스크롤 된 상태 
    let canvas = document.getElementById("edit_area");
    const rect = canvas.getBoundingClientRect();
    let cursor_x = e.clientX - rect.left;
    let temp_idx = (cursor_x-START_XPOS)*g_numSmp_per_px+scrollPosition;
    let clicked_ts = parseInt(temp_idx*1000/g_sampleRate+g_offset);

    if (isScrollMode) {   // ==> if 스크롤모드라면 scrollPosition 조정, 아니라면, note 데이터 Move 동작,
      scrollPosition = prev_position-scroll_x;
    } else {              // ==> 아니라면, note 데이터 Move 동작,
      console.log("여기에서 편집창을 열어 주어야 하는데 실수. clicked_ts="+clicked_ts+", isTsMoved="+isTsMoved );
      if ( ! isTsMoved) {   // TimeStamp 이동이 없었을 때에만. 기존 데이터의 편집 창이 열린다.
        // let cursor_y = e.clientY - rect.top;
        if (cursor_x > START_XPOS) {
          console.log("clicked xpos="+cursor_x+", clicked_ts:"+clicked_ts );
          open_note_edit_dlg(clicked_ts);
        }
      }
    }
  }
  moving_note_idx = -1;
  isScrollMode = false;
  isClicked = false;
  draw_editor();
  e.preventDefault();
}
var edit_wheelScroll = (e) => {
  scrollPosition += parseInt(e.deltaY/2)*g_numSmp_per_px;
  draw_editor();
}
var set_chord_auto = () => {    // chord 명에 따라 현의 값을 자동으로 지정해 주는 함수.
  let _a = document.getElementById("a_input");
  let _e = document.getElementById("e_input");
  let _c = document.getElementById("c_input");
  let _g = document.getElementById("g_input");
  let _chord = document.getElementById("chord_input");
  console.log("set_chord_auto clicked : " +  _chord.value );

  let idx;
  // 코드 테이블 검색해서 문자열 비교한 다음에, 해당하는 index 에 값으로 A,E,C,G 의 값을 설정하도록 한다.
  for (idx=0; idx<chord_name_table.length; idx++) {
    if ( _chord.value === chord_name_table[idx] ) {   // 해당하는 코드를 찾으면, 
      // console.log("found code="+chord_name_table[idx]+" idx="+idx+": G="+chord_finger_g_table[idx]+" C="+chord_finger_c_table[idx]+" E="+chord_finger_e_table[idx]+" A="+chord_finger_a_table[idx] );
      _a.value = chord_finger_a_table[idx];
      _e.value = chord_finger_e_table[idx];
      _c.value = chord_finger_c_table[idx];
      _g.value = chord_finger_g_table[idx];
      break;
    }
  }
}
var btn_cancel_click = () => {
  close_note_edit_dlg();
  draw_editor();
}
var btn_ok_click = () => {
  let remove_flag = document.getElementById("remove_note").checked;
  if (note_idx_editing !== -1) {    // 편집 중이던 데이터가 기존에 존재하던 데이터라면,
    if (remove_flag) {    // 기존 데이터의 삭제
      console.log(" have to remove this note: idx="+note_idx_editing + " delete? " + remove_flag  );
      // 기존데이터(note_idx_editing)를 배열에서 제거할 것. 
      song_data.notes.splice(note_idx_editing, 1);
    } else {              // 기존 데이터의 수정
      let new_note = new_data_from_edit_dlg();
      song_data.notes[note_idx_editing] = new_note;
    }
  } else {
    if (remove_flag) {    // 삭제플래그가 설정되어 있으면 그냥 무시. 왜냐면 편집중인 데이터가 기존 데이터를 수정하던 게 아니니까.
    } else {              // 완전히 새로운 데이터를 추가.
      let new_note = new_data_from_edit_dlg();
      song_data.notes.push(new_note);
      console.log("new data="+JSON.stringify(new_note) );
    }
  }
  console.log( JSON.stringify(song_data.notes[note_idx_editing]) );

  close_note_edit_dlg();
  draw_editor();
}

/***********************************************
 *  Dialog 에 입력한 새로운 note 데이터를 악보에 반영한다. 
 *   TODO: tab 값을 확인하여 array 크기를 유효하게 정리해야 하며,
 *         tab 값을 기준으로 연주용 음계값을 변환하여 note판정용 데이터 ('note') 에 적용하도록 한다. !!!
 */
var getPretNum = (str) => {
  // let numStr = str.slice(1);
  let _num = Number(str.slice(1));
  if ( isNaN(_num) ) {
    _num = Number( str.substring(1, str.length-1) );
  }
  // console.log("Has finger mark?? :" + str + ", _num=" + _num);
  return _num;
}

var new_data_from_edit_dlg = () => {
  let new_note = new Object;
  new_note.timestamp = parseInt(document.getElementById("timeStamp_input").value);
  new_note.lyric = document.getElementById("lyric_input").value;
  new_note.chord = document.getElementById("chord_input").value;
  new_note.stroke = document.getElementById("stroke_input").value;
  new_note.technic = document.getElementById("technic_input").value;
  new_note.tab = new Array;
  new_note.note = new Array;

  let _g = document.getElementById("g_input").value;
  if ( _g != "" ) {
    if (_g.charAt(0) !== "G" ) _g = "G"+_g;
    new_note.tab.push(_g);
    // let _g_value = Number(_g.slice(1));
    let _g_value = getPretNum(_g);
    console.log("note G= "+ (_g_value+12) + ", _g= " + _g );
    new_note.note.push(  note_names[_g_value+12] );
  }
  let _c = document.getElementById("c_input").value;
  if ( _c != "" ) {
    if (_c.charAt(0) !== "C" ) _c = "C"+_c;
    new_note.tab.push(_c);
    // let _c_value = Number(_c.slice(1));
    let _c_value = getPretNum(_c);
    console.log("note C= "+ (_c_value+5) + ", _c= " + _c );
    new_note.note.push(  note_names[_c_value+5] );
  }
  let _e = document.getElementById("e_input").value;
  if ( _e != "" ) {
    if (_e.charAt(0) !== "E" ) _e = "E"+_e;
    new_note.tab.push(_e);
    // let _e_value = Number(_e.slice(1));
    let _e_value = getPretNum(_e);
    console.log("note E= "+ (_e_value+9) + ", _e= " + _e );
    new_note.note.push(  note_names[_e_value+9] );
  }
  let _a = document.getElementById("a_input").value;
  if ( _a != "" ) {
    if (_a.charAt(0) !== "A" ) _a = "A"+_a;
    new_note.tab.push(_a);
    // let _a_value = Number(_a.slice(1));
    let _a_value = getPretNum(_a);
    console.log("note A= "+ (_a_value+14) + ", _a= " + _a );
    new_note.note.push(  note_names[_a_value+14] );
  }
  return new_note;
}


var find_note_index = (from_ts, to_ts) => {
  let notes = song_data.notes;
  for (i=0; i<notes.length; i++) {
    if ( (notes[i].timestamp >= from_ts)&&(notes[i].timestamp < to_ts) ) {
      return i;
    }
  }
  return -1;
}
var set_edit_column_for_ts = (from_ts, to_ts) => {
  // console.log("from:"+from_ts + ", to:"+ to_ts + ", no data" );
  document.getElementById("timeStamp_input").value = ""+from_ts;
  document.getElementById("lyric_input").value = "";
  document.getElementById("chord_input").value = "";
  document.getElementById("stroke_input").value = "";
  document.getElementById("technic_input").value = "";
  document.getElementById("a_input").value = "";
  document.getElementById("e_input").value = "";
  document.getElementById("c_input").value = "";
  document.getElementById("g_input").value = "";

  note_idx_editing = find_note_index(from_ts, to_ts);
  if (note_idx_editing !== -1) {
    let notes = song_data.notes[note_idx_editing];
    console.log("from:"+from_ts + ", to:"+ to_ts + ", note["+note_idx_editing+"]={" + notes.timestamp + ", " + notes.lyric+"}" );
    document.getElementById("timeStamp_input").value = ""+notes.timestamp;  //from_ts;
    if (notes.lyric) document.getElementById("lyric_input").value = notes.lyric;
    document.getElementById("chord_input").value = notes.chord;
    if (notes.stroke) document.getElementById("stroke_input").value = notes.stroke;
    if (notes.technic) document.getElementById("technic_input").value = notes.technic;
    for (var j=0; j<notes.tab.length; j++) {
      switch( notes.tab[j].charAt(0)) {
        case "A":
          document.getElementById("a_input").value = notes.tab[j].slice(1);
          break;
        case "E":
          document.getElementById("e_input").value = notes.tab[j].slice(1);
          break;
        case "C":
          document.getElementById("c_input").value = notes.tab[j].slice(1);
          break;
        case "G":
          document.getElementById("g_input").value = notes.tab[j].slice(1);
          break;
        default:
          console.error("Something Wrong at note string:"+ notes.tab[j] );
          break;
      }
    }
  }

}

var open_note_edit_dlg = (clicked_ts) => {
  let note_ts = parseInt(clicked_ts/g_ms_for_quaver)*g_ms_for_quaver;
  console.log("[] DEBUGGING []  clicked_ts="+clicked_ts+", g_ms_for_quaver="+ g_ms_for_quaver + ", clicked_ts/g_ms_for_quaver="+clicked_ts/g_ms_for_quaver + ", note_ts="+note_ts );
  set_edit_column_for_ts( note_ts, (note_ts+g_ms_for_quaver) );

  let dlg_wnd = document.getElementById("note_edit_window");
  document.getElementById("remove_note").checked = false;
  dlg_wnd.classList.remove("closed");
}
var close_note_edit_dlg = () => {
  let dlg_wnd = document.getElementById("note_edit_window");
  dlg_wnd.classList.add("closed");
  note_idx_editing = -1;
}

var changeThumnail = (imgsrc) => {    /* when ThumbNail file upload succed. */
  let imgTag = document.getElementById("thumbnail");
  imgTag.src = "http://ccash.gonetis.com:88/uke_blog/data/"+ imgsrc;
  document.getElementById("loadThumbnail_file").innerHTML = imgsrc;
}

var upload = () => {
  alert("Upload() is not implimented.");
}
var download = () => {
  //song_data에서, 실제 데이터가 없는 note 들을 제거해 주어야 함.
  let i;
  for (i=0; i<song_data.notes.length; i++) {
    let _note = song_data.notes[i];
    if (_note.tab.length > 0) {     // 뭔가 데이터가 있음.
      continue;
    }
    if (_note.note.length > 0) {     // 뭔가 데이터가 있음.
      continue;
    }
    if (_note.technic != "" ) {
      continue;
    }
    if (_note.stroke != "" ) {
      continue;
    }
    if (_note.lyric != "" ) {
      continue;
    }
    if (_note.chord != "" ) {
      continue;
    }
    console.log("CHECK AGAIN: error 를 만들 가능성: i="+i+", note="+JSON.stringify(_note) );           // chord="+_note.chord );
    song_data.notes[i].timestamp = -1;    // 일단 TS 를 -1 로 설정 함. - 배열을 loop 도는 중에 빼 버리면 error 발생 가능성이 있으므로 나중에 몰아서 처리하기 위함. 
  }
  let _notes = new Array;
  for (i=0; i<song_data.notes.length; i++) {
    let _note = song_data.notes[i];
    if (_note.timestamp > 0) {
      _notes.push(_note);
    }
  }
  _notes.sort( (a,b) => {
    if (a.timestamp > b.timestamp ) {
      return 1;
    } else if (a.timestamp < b.timestamp ) {
      return -1;
    } else {
      return 0;
    }
  } );
  song_data.notes = _notes;

  //song_data 에서, notes 배열을, timestamp 값을 기준으로  sort 할 것.
  // song_data.notes.sort( (a,b) => {
  //   if (a.timestamp > b.timestamp ) {
  //     return 1;
  //   } else if (a.timestamp < b.timestamp ) {
  //     return -1;
  //   } else {
  //     return 0;
  //   }
  // } );
  downloadObjectAsJson(song_data, song_data.title );
}

function downloadObjectAsJson(exportObj, exportName){
  var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
  var downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href",     dataStr);
  downloadAnchorNode.setAttribute("download", exportName + ".json");
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

/*
async function ThumbUploadFile() {
  var uploadfiles = document.getElementById("loadThumbnail");

  let formData = new FormData();
  formData.append("file", uploadfiles.files[0]);
  await fetch('/uke_blog/upload.php', {
    method: "POST", 
    body: formData
  });
  alert('The file has been uploaded successfully.');
}

async function uploadFile() {
  var uploadfiles = document.getElementById("loadMP3");

  let formData = new FormData();
  formData.append("file", uploadfiles.files[0]);
  await fetch('/uke_blog/upload.php', {
    method: "POST", 
    body: formData
  });
  alert('The file has been uploaded successfully.');
}
*/
