/*
    cri_parse.js
    - DVBSTP로 부터 segment 별로 분리/추출한 데이터 (cri_container)를 분석해 줌.
*/

var txt_num_struct = document.getElementById("num_cri_structures");
var lst_header = document.getElementById("container_header");
var lst_struct = document.getElementById("cri_structure");

var val_num_cri_struct=0;


//////////////////////////// 이런 종류의 parsing 할 때 기본적으로 사용되는 몇가지 함수들.
var dump_blob = (data, start_idx) => {
    var dump_str = ""; 
    for (let i= start_idx; i< data.length; i++) {
        dump_str += data[i].toString(16).toUpperCase()+" ";
    }
    return dump_str;
}

var cri_file_changed = (imgsrc) => {    /* when ThumbNail file upload succed. */
    let loadingfiles = document.getElementById("crid_container_file_in");  //.dataTransfer.files;
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
        cri_header_parse(buffer);
        set_result();
    });
    reader.readAsArrayBuffer(loadingfiles.files[0]);     //    - File이나 Blob의 바이너리 데이터를 읽어서 ArrayBuffer로 반환
}

var cri_from_text = () => {
    let long_text = document.getElementById("cri_packet").value;
    console.log("test용 문자열: " + long_text );
    let blob = convert_text_to_blob(long_text);
    cri_header_parse(blob);
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
var cri_header_parse = (blob) => {
    let offset = 0;
    val_num_cri_struct = blob[0];       
    document.getElementById("num_cri_structures").innerText = val_num_cri_struct;
    offset++;
    let type;
    let id;
    let ptr;
    let len;
    let ul_tag = document.getElementById("container_header");
    ul_tag.innerHTML = "";
    for (var i=0; i<val_num_cri_struct; i++) {
        type = blob[offset+0];
        id =  blob[offset+1];
        ptr = (blob[offset+2]<<16) | (blob[offset+3]<<8) | blob[offset+4];
        len = (blob[offset+5]<<16) | (blob[offset+6]<<8) | blob[offset+7];
        ul_tag.innerHTML = ul_tag.innerHTML 
                + "<li><p>type: 0x"+type.toString(16).toUpperCase() 
                + ", id: 0x"+id.toString(16).toUpperCase() 
                + ", ptr: 0x"+ptr.toString(16).toUpperCase() 
                + ", length: "+len+" (0x"+len.toString(16).toUpperCase()+")"
                + "<br/>  <a href='dsm-cc-addressable/index.html?payload="+dump_blob(blob.slice(ptr,ptr+len), 0)+"'> DATA: </a>" + dump_blob(blob.slice(ptr,ptr+len), 0)
                + "</p></li>";
        offset+= 8;
    }
    // cri_struct dump
    // for (var i=0; i<val_num_cri_struct; i++) {

    // }





    
    // val_ver = (blob[0] >> 6)& 0x03;
    // val_reserv = (blob[0] >> 3)& 0x07;
    // val_enc = (blob[0] >> 1)& 0x03;
    // val_c = blob[0]& 0x01;
    // val_totalSegmentSize = (blob[1]<<16) | (blob[2]<<8) | blob[3];
    // val_payloadId = blob[4]&0xFF;
    // val_segmentId = (blob[5]<<8) | blob[6]&0xFF;
    // val_segmentVersion = blob[7]&0xFF;
    // val_sectionNumber = (blob[8]<<4) | (blob[9]>>4)&0x0F;
    // val_lastSectionNumber = ((blob[9]&0x0F)<<8) | blob[10]&0xFF;
    // if (val_lastSectionNumber < val_sectionNumber) {
    //     console.log("LastSectionNumber is wrong");
    // }
    // val_compr = (blob[11] >> 5)& 0x07;
    // val_p = (blob[11] >> 4)& 0x01;
    // val_hdrLen = blob[11]& 0x0F;
    // let payload_start_idx = 12;
    // if (val_p != 0) {
    //     val_serviceProviderId = (blob[12]<<24) | (blob[13]<<16) | (blob[14]<< 8) | blob[15]&0xFF;
    //     payload_start_idx += 4;
    // } else {
    //     val_serviceProviderId = 0;
    //     txt_serviceProviderId.innerHTML = "";
    // }
    // if (val_hdrLen!=0) {
    //     val_privateHeaderData = (blob[16] <<24) | (blob[17] <<16) | (blob[18] << 8) | blob[19]&0xFF;
    //     payload_start_idx += 4;
    // } else {
    //     val_privateHeaderData = 0;
    //     txt_privateHeaderData.innerHTML = "";
    // }

    // let blob_payload = blob.slice(payload_start_idx, blob.length-4);
    // val_payload = dump_blob( blob_payload, 0 );

    // calculated_crc = b_crc32(blob_payload);
    // console.log(" temporary CRC : " + calculated_crc.toString(16) + " blob.length=" + blob_payload.length);

    // if (val_c != 0) {
    //     let tail_idx = blob.length;
    //     // let crc_value = (blob[tail_idx-4]<<24) | (blob[tail_idx-3]<<16) | (blob[tail_idx-2]<< 8) | blob[tail_idx-1]&0xFF;
    //     // val_crc = crc_value.toString(16).toUpperCase();
    //     val_crc = blob[tail_idx-4].toString(16)+ " " +blob[tail_idx-3].toString(16)+" "+blob[tail_idx-2].toString(16)+" "+blob[tail_idx-1].toString(16);
    // } else {
    //     val_crc = "--------";
    // }
}

var set_result = () => {
    // txt_ver.innerHTML = "<sub>ver:</sub> "+val_ver;
    // txt_reserv.innerHTML = "<sub>rsrv:</sub> "+val_reserv;
    // txt_enc.innerHTML = "<sub>Enc:</sub> "+val_enc;
    // txt_c.innerHTML = val_c;
    // txt_totalSegmentSize.innerHTML = "<sub>Total_Segment_Size:</sub> "+val_totalSegmentSize + " (0x"+val_totalSegmentSize.toString(16).toUpperCase()+")";
    // txt_payloadId.innerHTML = "<sub>Payload_ID:</sub> "+ val_payloadId + " (0x"+val_payloadId.toString(16).toUpperCase()+")";
    // let payload_title = document.getElementById("payload_kind");
    // switch(val_payloadId) {
    //     case 0x01:
    //         payload_title.innerText = "ServiceProviderDiscovery";
    //         break;
    //     case 0x02:
    //         payload_title.innerText = "LinearTVDiscovery";
    //         break;
    //     case 0x03:
    //         payload_title.innerText = "ContentGuideDiscovery";
    //         break;
    //     case 0x05:
    //         payload_title.innerText = "PackageDiscovery";
    //         break;
    //     case 0xA3:
    //         payload_title.innerText = "ScheduleDiscovery";
    //         break;
    //     case 0xF0:
    //         payload_title.innerText = "SystemTimeDiscovery";
    //         break;
    //     default:
    //         payload_title.innerText = "UNKNOWN";
    //         break;
    // }
    // txt_segmentId.innerHTML = "<sub>Segment_ID:</sub> "+ val_segmentId + " (0x"+val_segmentId.toString(16).toUpperCase()+")";
    // txt_segmentVersion.innerHTML = "<sub>Segment_Version:</sub> "+ val_segmentVersion + " (0x"+val_segmentVersion.toString(16).toUpperCase()+")";
    // txt_sectionNumber.innerHTML = "<sub>Section_Number:</sub> "+ val_sectionNumber + " (0x"+val_sectionNumber.toString(16).toUpperCase()+")";
    // txt_lastSectionNumber.innerHTML = "<sub>Last_Section_Number:</sub> "+ val_lastSectionNumber + " (0x"+val_lastSectionNumber.toString(16).toUpperCase()+")";
    // if (val_lastSectionNumber < val_sectionNumber) {
    //     txt_lastSectionNumber.style.background="red";
    // } else {
    //     txt_lastSectionNumber.style.background="";
    // }
    // txt_compr.innerHTML = "<sub>Compr:</sub> "+ val_compr;
    // txt_p.innerHTML = val_p;
    // txt_hdrLen.innerHTML = "<sub>HDR_LEN:</sub> "+ val_hdrLen
    // if (val_p != 0) {
    //     txt_serviceProviderId.innerHTML = "<sub>ServiceProviderID:</sub> "+ val_serviceProviderId + " (0x"+val_serviceProviderId.toString(16).toUpperCase()+")";
    // }
    // if (val_hdrLen > 0) {
    //     txt_privateHeaderData.innerHTML = "<sub>Private_Header_Data:</sub> "+ val_privateHeaderData + " (0x"+val_privateHeaderData.toString(16).toUpperCase()+")";
    // }
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
    // if ( (val_p==0) && (val_serviceProviderId != "") ) {
    //     console.log("[][] WARNING [][] Somthing Wrong !! if val_p==0 then val_serviceProviderId must be 0 !!");
    //     _has_weird = true;
    // }
    // if ( (val_hdrLen<=0) && (val_privateHeaderData != "") ) {
    //     console.log("[][] WARNING [][] Somthing Wrong !! if val_hdrLen then val_privateHeaderData must be empty !!");
    // }
    // if ( (val_c == 0) && (val_crc != -1) ) {
    //     console.log("[][] WARNING [][] Somthing Wrong !! if val_c==0 then val_crc must be -1 !!");
    // } else {
    //     // if (val_crc != calculated_crc ) {
    //     //     console.log("[][] WARNING [][] CRC value mismatched !!");
    //     // }
    // }

    // if (_has_weird ) {
    //     console.log("[][] WARNING [][] Somthing Wrong !! if val_c==0 then val_crc must be -1 !!");
    //     return;
    // }
    console.log("Integriy OK !! ");
}


