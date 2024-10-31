var images = document.getElementsByClassName('image-thumbnail');
var modal = document.getElementById('imageModal');
var modalImg = document.getElementById('modalImage');
var closeBtn = document.getElementsByClassName('close')[0];
var currentIndex = 0;

for (var i = 0; i < images.length; i++) {
    images[i].onclick = function() {
        modal.style.display = 'block';
        modalImg.src = this.src;
        currentIndex = Array.prototype.indexOf.call(images, this);
    }
}

closeBtn.onclick = function() {
    modal.style.display = 'none';
}

function changeImage(n) {
    currentIndex += n;
    if (currentIndex >= images.length) {
        currentIndex = 0;
    } else if (currentIndex < 0) {
        currentIndex = images.length - 1;
    }
    modalImg.src = images[currentIndex].src;
}

modal.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

window.addEventListener('load', function() {
    document.querySelector('.overlay').classList.add('active');
});

