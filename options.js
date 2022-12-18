
var hash1, hash2;

var debug;
debug = 1;

var VIRUSTOTAL_SEARCH_URL = "https://www.virustotal.com/#/search/";

var resulto = document.getElementById('result');
var result_msg = document.getElementById('result_msg');
var file_zone1 = document.getElementById('file_zone1');
var file_zone2 = document.getElementById('file_zone2');

var result_css = {
  no_result: "2px solid #DDDDDD",
  files_equal: "2px solid #33AF33",
  files_not_equal: "2px solid #BB2222",
  no_choosen: "2px solid #DDDDDD" 
};


function toConsole(msg){
  if (debug == 1) console.log(msg);
}

function compareHash(h1, h2){
  if(h1 !== undefined && h2 !== undefined && h1 !== null && h2 !== null){ 
      if(h2 === h1) {
        //alert('Files are equal!!');
        resulto.style.border = result_css.files_equal;
        //alert(result_css.files_equal);
        result_msg.innerHTML = "Files are equal!";
      }
      else{
        //alert('Files are not equal!!'); 
        resulto.style.border = result_css.files_not_equal;
        result_msg.innerHTML = "Files are not equal!";
      }
  }
}


function fileSelect1(evt) {
    //alert(1);
    var files = evt.target.files; // FileList object

    // files is a FileList of File objects. List some properties.
    //var output = [];
    // for (var i = 0, f; f = files[i]; i++) {
    //   output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
    //               f.size, ' bytes, last modified: ',
    //               f.lastModifiedDate.toLocaleDateString(), '</li>');
    // }
    //document.getElementById('list1').innerHTML = '<ul>' + output.join('') + '</ul>';

    if(files[0]) {
        handle_worker_event = function (e) {
                if(e.data.hash){ 
                    var hash = e.data.hash; 
                    toConsole("hash1 is calculated: " +  hash);
                    document.getElementById('hash1_result').innerHTML = hash; 
                    hash1 = hash;
                    compareHash(hash1, hash2);
                } 
                else console.log("hash1 progress: " + e.data.progress);   
        }
        document.getElementById('hash1_result').innerHTML = '<span style="color:#765">please wait...</span>';
        worker = new Worker("sha256-hashworker.js");  
        worker.onmessage = handle_worker_event;
        worker.onerror = function(){ toConsole('Worker Error'); } 
        worker.postMessage(files[0]);
        file_zone1.style.border = result_css.files_equal;  
    }
    else {
      hash1 = null;
      document.getElementById('hash1_result').innerHTML = 'no file';
      file_zone1.style.border = result_css.no_choosen;
      resulto.style.border = result_css.no_result;
      result_msg.innerHTML = "Choose files";
    }  
  }

  document.getElementById('file1').addEventListener('change', fileSelect1, false);

  document.getElementById('viruscheck1').addEventListener('click', function() {
	  var hash = document.getElementById('hash1_result').innerHTML;
	  if(hash.length > 50) {
		 chrome.tabs.create({ url: (VIRUSTOTAL_SEARCH_URL+hash) });
	  }
  }, false);
  

//** file2
function fileSelect2(evt) {
    //alert(1);
    var files = evt.target.files; // FileList object

    // files is a FileList of File objects. List some properties.
    //var output = [];
    // for (var i = 0, f; f = files[i]; i++) {
    //   output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
    //               f.size, ' bytes, last modified: ',
    //               f.lastModifiedDate.toLocaleDateString(), '</li>');
    // }
    //document.getElementById('list2').innerHTML = '<ul>' + output.join('') + '</ul>';

    if(files[0]) {
        handle_worker_event = function (e) {
                if(e.data.hash){ 
                    var hash = e.data.hash; 
                    toConsole("hash2 is calculated: " +  hash);
                    document.getElementById('hash2_result').innerHTML = hash;
                    hash2 = hash; 
                    compareHash(hash1, hash2);
                } 
                else console.log("hash2 progress: " + e.data.progress);   
        }
        document.getElementById('hash2_result').innerHTML = '<span style="color:#765">please wait...</span>';
        worker = new Worker("sha256-hashworker.js");  
        worker.onmessage = handle_worker_event;
        worker.onerror = function(){ toConsole('Worker Error'); } 
        worker.postMessage(files[0]);
        file_zone2.style.border = result_css.files_equal;  
    }
    else {
      hash2 = null;
      document.getElementById('hash2_result').innerHTML = 'no file';
      file_zone2.style.border = result_css.no_choosen;
      resulto.style.border = result_css.no_result;
      result_msg.innerHTML = "Choose Files";
    } 
  }

  document.getElementById('file2').addEventListener('change', fileSelect2, false);

  document.getElementById('viruscheck2').addEventListener('click', function() {
	  var hash = document.getElementById('hash2_result').innerHTML;
	  if(hash.length > 50) {
		 chrome.tabs.create({ url: (VIRUSTOTAL_SEARCH_URL+hash) });
	  }
  }, false);

  // document.getElementById('file1_hash_calc').addEventListener('click', function(){
  //     toConsole('file1_hash_calc click');


  // }, false);

