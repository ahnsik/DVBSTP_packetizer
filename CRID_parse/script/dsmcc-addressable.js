/*
    DSMCC-addressable.js
    - DVBSTP 의 Schedule 정보 parsing 을 위해 DSMCC-addressable-section 을 분석해 줌.
*/


//////////////////////////// 이런 종류의 parsing 할 때 기본적으로 사용되는 몇가지 함수들.
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

var dump_blob = (data, start_idx) => {
    var dump_str = ""; 
    for (let i= start_idx; i< data.length; i++) {
        dump_str += data[i].toString(16).toUpperCase()+" ";
    }
    return dump_str;
}

var addressable_file_changed = (imgsrc) => {    /* when ThumbNail file upload succed. */
    let loadingfiles = document.getElementById("dsmcc-addressable_file_in");  //.dataTransfer.files;
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
        let buffer = new Uint8Array(reader.result);
        // console.log("check : " + buffer);
        console.log("hex dump : ");
        let dump_string="";
        for (let i=0; i<buffer.length; i++) {
            dump_string += buffer[i].toString(16).toUpperCase() + ",";
        }
        console.log( dump_string );
        // start parsing
        dsmcc_addressable_parse(buffer);
        set_result();
    });
    reader.readAsArrayBuffer(loadingfiles.files[0]);     //    - File이나 Blob의 바이너리 데이터를 읽어서 ArrayBuffer로 반환
}

var packet_from_text = () => {
    let long_text = document.getElementById("dsmcc-addressable").value;
    console.log("test용 문자열: " + long_text );
    let blob = convert_text_to_blob(long_text);
    dsmcc_addressable_parse(blob);
    set_result();
}

var convert_text_to_blob = (inputtext) => {
    var str_array;
    if ( inputtext.indexOf(",") >= 0) {
        console.log("HAS comma");
        str_array = inputtext.split(',');
    } else {
        console.log("No Comma. Split with SPACE");
        str_array = inputtext.split(' ');
    }

    var ia = []; // new Uint8Array();
    for (let i=0; i<str_array.length; i++) {
        ia.push( (parseInt(str_array[i], 16) & 0xFF) );         /// TODO:  여기에서 str_array[i] 의 값을 HEX 문자열에서 UINT8로 바꾸어 주어야 함.
    }
    return ia;
}

window.onload = function main() {
    // set_result();
    let payload_str = getParameterByName("payload");
    let text_area = document.getElementById("dsmcc-addressable");
    text_area.innerText = payload_str;
    packet_from_text();
}

/* --- source code from : https://stackoverflow.com/questions/18638900/javascript-crc32
 */
var a_table = "00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D";
var b_table = a_table.split(' ').map(function(s){ return parseInt(s,16) });
function b_crc32 (blob) {
    var crc = -1;
    for(var i=0, iTop=blob.length; i<iTop; i++) {
        crc = ( crc >>> 8 ) ^ b_table[( crc ^ blob[i] ) & 0xFF];
    }
    return (crc ^ (-1)) >>> 0;
};


///////////////////////////////////////////////
////    본격적인 parsing 루틴.
////

var val_tableId;
var mustbe_0;
var val_err_detect_type;
var val_reserved_1;
var val_reserved_2;
var val_addr_section_len;
var val_devId_0;
var val_devId_1;
var val_devId_2;
var val_devId_3;
var val_devId_4;
var val_devId_5;
var val_payl_scrmb_ctrl;
var val_addr_scrmb_ctrl;
var val_LLC_flag;
var mustbe_1;
var val_section_num;
var val_last_section_num;
var val_datagram_data;

var dsmcc_addressable_parse = (blob) => {
    let offset = 0;
    val_tableId = blob[0];
    mustbe_0 = (blob[1]>>7)&0x01;
    val_err_detect_type = (blob[1]>>6)&0x01;
    val_reserved_1 = (blob[1]>>4)&0x03;
    val_addr_section_len = ((blob[1]<<8)&0xF00) | (blob[2]&0xFF);
    val_devId_0 = blob[3];
    val_devId_1 = blob[4];
    val_reserved_2 = (blob[5]>>6)&0x03;
    val_payl_scrmb_ctrl = (blob[5]>>4)&0x03;
    val_addr_scrmb_ctrl = (blob[5]>>2)&0x03;
    val_LLC_flag = (blob[5]>>1)&0x01;
    mustbe_1 = blob[5]&0x01;
    val_section_num = blob[6];
    val_last_section_num = blob[7];
    val_devId_2 = blob[8];
    val_devId_3 = blob[9];
    val_devId_4 = blob[10];
    val_devId_5 = blob[11];
    val_datagram_data = blob.slice(12);
}

var set_result = () => {
    let txt_tableID = document.getElementById("table_id");
    txt_tableID.innerHTML = "<sub>table_id:</sub>0x"+val_tableId.toString(16).toUpperCase();
    if (val_tableId != 0x3F) {
        txt_tableID.style.backgroundColor = "RED";
    }
    let txt_mustbe_0 = document.getElementById("mustbe_0");
    if (mustbe_0 != 0) {
        txt_mustbe_0.style.backgroundColor="RED";
    } else {
        txt_mustbe_0.style.color="darkgray";
    }

    let txt_err_detect_type = document.getElementById("error_detection_type");
    txt_err_detect_type.innerHTML = "<sub>err<br/>dtct<br/>:</sub>"+val_err_detect_type;
    if (val_err_detect_type!=0) {
        txt_err_detect_type.style.backgroundColor="red";
    }
    let txt_reserved_1 = document.getElementById("reserved_1");
    txt_reserved_1.innerHTML = "<sub>rsrvd:</sub>"+val_reserved_1;
    if (val_reserved_1 != 3) {
        txt_reserved_1.style.backgroundColor="RED";
    } else {
        txt_reserved_1.style.color="DARKGRAY";
    }
    let txt_addr_section_len = document.getElementById("addrsect_len");
    txt_addr_section_len.innerHTML = "<sub>addressable section length:</sub> " + val_addr_section_len+" (0x"+val_addr_section_len.toString(16).toUpperCase()+")";
    if (val_addr_section_len >= 4093) {
        txt_addr_section_len.style.backgroundColor = "RED";
    }
    let txt_devId_0 = document.getElementById("devid_0");
    txt_devId_0.innerHTML = "<sub>deviceId[7..0]:<br/></sub>" + val_devId_0.toString(16).toUpperCase();
    let txt_devId_1 = document.getElementById("devid_1");
    txt_devId_1.innerHTML = "<sub>deviceId[15..8]:</sub><br/>" + val_devId_1.toString(16).toUpperCase();
    let txt_reserved_2 = document.getElementById("reserved_2");
    txt_reserved_2.innerHTML = "<sub>rsrvd:</sub>"+val_reserved_2;
    if (val_reserved_2 != 3) {
        txt_reserved_2.style.backgroundColor="RED";
    } else {
        txt_reserved_2.style.color="DARKGRAY";
    }
    let txt_payl_scrmb_ctrl = document.getElementById("payload_scrmb_ctrl");
    txt_payl_scrmb_ctrl.innerHTML = "<sub>pyld<br/>scrmb<br/></sub>="+val_payl_scrmb_ctrl;
    let txt_addr_scrmb_ctrl = document.getElementById("addr_scrmb_ctrl");
    txt_addr_scrmb_ctrl.innerHTML = "<sub>addr<br/>scrmb<br/></sub>="+val_addr_scrmb_ctrl;
    let txt_LLC_flag = document.getElementById("LLC_flg");
    txt_LLC_flag.innerHTML = "<sub>LLC<br/>flg<br/></sub>&"+val_LLC_flag;
    let txt_mustbe_1 = document.getElementById("mustbe_1");
    if (mustbe_1 != 1) {
        txt_mustbe_1.style.backgroundColor="RED";
    } else {
        txt_mustbe_1.style.color="darkgray";
    }
    let txt_section_num = document.getElementById("section_num");
    txt_section_num.innerHTML = "<sub>section_number:<br/></sub>"+val_section_num;
    let txt_last_section_num = document.getElementById("last_section_numb");
    txt_last_section_num.innerHTML = "<sub>last section_number<br/></sub>="+val_last_section_num;
    let txt_devId_2 = document.getElementById("devid_2");
    txt_devId_2.innerHTML = "<sub>deviceId[23..16]<br/></sub>" + val_devId_2.toString(16).toUpperCase();
    let txt_devId_3 = document.getElementById("devid_3");
    txt_devId_3.innerHTML = "<sub>deviceId[31..24]<br/></sub>" + val_devId_3.toString(16).toUpperCase();
    let txt_devId_4 = document.getElementById("devid_4");
    txt_devId_4.innerHTML = "<sub>deviceId[39..32]<br/></sub>" + val_devId_4.toString(16).toUpperCase();
    let txt_devId_5 = document.getElementById("devid_5");
    txt_devId_5.innerHTML = "<sub>deviceId[47..40]<br/></sub>" + val_devId_5.toString(16).toUpperCase();

    let txt_datagram = document.getElementById("SNU_low");
    if (val_LLC_flag==1) {
        txt_datagram.innerHTML = "<sub>LLCSNAP():</sub>"+val_datagram_data;
    } else {
        txt_datagram.innerHTML = "<sub>datagram_data_byte<br/>:</sub>"+dump_blob(val_datagram_data.slice(0,40), 0)+"...";
    }
    
    // txt_payload.innerHTML = val_payload;
    // txt_crc.innerHTML = val_crc;
    // let crc_generated = document.getElementById("crc_generated");
    // crc_generated.innerText = calculated_crc.toString(16);

    check_integration();
}


/*  패킷 파싱한 결과의 무결성 (?) 검사를 위해, parsing 완료된 데이터 들의 조건 및 값의 범위 등을 check 한다. 
*/
var check_integration = () => {
    var _has_weird = false;
    console.log("Integriy OK !! ");
}


