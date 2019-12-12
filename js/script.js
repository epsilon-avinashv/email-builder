var editBtn = document.getElementById('editBtn');
var editables = document.querySelectorAll('#title, #content')

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
    var source = document;
    window.location.href = "preview.html?data=" + btoa(source);
  }

  