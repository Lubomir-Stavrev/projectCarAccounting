function showCommentSection(e) {
    if (e) {

        e.preventDefault();
    }

    let commentSection = document.getElementById('comment-Container');

    if (commentSection.style.display == 'block') {
        e.target.textContent = 'See Comments'
        commentSection.style.display = 'none'
    } else {
        e.target.textContent = 'Hide Comments'
        commentSection.style.display = 'block'
        window.scrollTo(0, document.body.scrollHeight);
    }
}

showCommentSection();