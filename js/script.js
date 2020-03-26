var editBtn = document.getElementById('editBtn');
var editables = document.querySelectorAll('#title, #content')

if (localStorage["title"] != null || localStorage["content"] != null) {
    document.getElementById("title").innerHTML = localStorage.getItem("title");
    document.getElementById("content").innerHTML = localStorage.getItem("content");
    //document.getElementById("content").innerHTML = localStorage.getItem("content");
}

editBtn.addEventListener('click', function (e) {
    if (!editables[0].isContentEditable) {
        editables[0].contentEditable = 'true';
        editables[1].contentEditable = 'true';
        //editables[2].contentEditable = 'true';
        editBtn.innerHTML = 'Save Changes';
        editBtn.style.backgroundColor = '#6F9';
        
    } else {
        // Disable Editing
        editables[0].contentEditable = 'false';
        editables[1].contentEditable = 'false';
        //editables[2].contentEditable = 'false';
        // Change Button Text and Color
        editBtn.innerHTML = 'Enable Editing';
        editBtn.style.backgroundColor = '#F96';
        // Save the data in localStorage 
        for (var i = 0; i < editables.length; i++) {
            localStorage.setItem(editables[i].getAttribute('id'), editables[i].innerHTML);
        }
    }
});



$(".swapImgBtn").click(function (e) {
    var btnId = '#' + e.currentTarget.id;
    $(btnId).next().trigger('click');
    var input = document.getElementById($(btnId).next().context.activeElement.nextElementSibling.id);
    var builderItem = $(btnId).next().context.activeElement.nextElementSibling.attributes.builderItem.value;
    input.onchange = function () {
        var file = input.files[0];
        console.log(builderItem);
        drawOnCanvas(file, builderItem);
        var imgAsDataURL = imgCanvas.toDataURL("image/png");
        localStorage.setItem(file, imgAsDataURL)
    };
});


function drawOnCanvas(file, i) {
    var reader = new FileReader();
    reader.onload = function (e) {
        var dataURL = e.target.result, elem = document.getElementById("swapImgBtn" + i), img = document.createElement('img');
        img.setAttribute('src', dataURL);
        img.setAttribute('id', 'builder-current-img'+i);
        if (document.getElementById("builder-current-img"+i)) {
            document.getElementById("builder-current-img"+i).remove();
        }
        elem.after(img);
        document.getElementById("current-img" + i).style.display = "none";
    };

    reader.readAsDataURL(file);
}


function preview() {
    let btn = document.querySelectorAll('.swapImgBtn');
    btn.forEach(e => e.style.display = 'none');
    document.querySelector("#editBtn").style.display = 'none';
    document.querySelector("#builder-preview-btn").innerText = 'Download';
    document.querySelector("#builder-preview-btn").addEventListener('click', e => {
        document.querySelector("#builder-preview-btn").style.display = 'none';
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/html;charset=UTF-8,' + encodeURIComponent(document.documentElement.outerHTML))
        element.setAttribute('download', "uru_emailer.html");
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    })
}
