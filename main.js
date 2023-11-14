const posts = [
    {
        id: 1,
        content: "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        media: "https://unsplash.it/600/300?image=171",
        author: {
            name: "Phil Mangione",
            image: "https://unsplash.it/300/300?image=15"
        },
        likes: 80,
        created: "2023-11-5"
    },
    {
        id: 2,
        content: "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        media: "https://unsplash.it/600/400?image=112",
        author: {
            name: "Sofia Perlari",
            image: "https://unsplash.it/300/300?image=10"
        },
        likes: 120,
        created: "2023-09-03"
    },
    {
        id: 3,
        content: "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        media: "https://unsplash.it/600/400?image=234",
        author: {
            name: "Chiara Passaro",
            image: "https://unsplash.it/300/300?image=20"
        },
        likes: 78,
        created: "2022-05-15"
    },
    {
        id: 4,
        content: "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        media: "https://unsplash.it/600/400?image=24",
        author: {
            name: "Luca Formicola",
            image: null
        },
        likes: 56,
        created: "2021-04-03"
    },
    {
        id: 5,
        content: "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        media: "https://unsplash.it/600/400?image=534",
        author: {
            name: "Alessandro Sainato",
            image: "https://unsplash.it/300/300?image=29"
        },
        likes: 95,
        created: "2021-01-05"
    }
];
const container = document.getElementById('container');
const currentDate = new Date();


posts.forEach((post) => postGenerator(post));

let likeButtons = document.querySelectorAll('.js-like-button');
let likeCounters = document.querySelectorAll('.js-likes-counter');

likeButtons.forEach((likeButton) => {
    likeButton.addEventListener('click', () => {
        if (likeButton.classList.contains('like-button--liked')) {
            likeButton.classList.remove('like-button--liked');
            likeCounters.forEach((likeCounter) => {
                if (likeCounter.id[likeCounter.id.length - 1] == likeButton.getAttribute('data-postid')) {
                    likeCounter.innerHTML = parseInt(likeCounter.innerHTML) - 1;
                }
            })
        } else {
            likeButton.classList.add('like-button--liked');
            likeCounters.forEach((likeCounter) => {
                if (likeCounter.id[likeCounter.id.length - 1] == likeButton.getAttribute('data-postid')) {
                    likeCounter.innerHTML = parseInt(likeCounter.innerHTML) + 1;
                }
            })
        }
    })
})

/**
 * Generates a function comment for the given function body.
 *
 * @param {object} post - The post object.
 * @param {string} post.created - The creation date of the post in the format 'YYYY-MM-DD'.
 * @param {object} post.author - The author object.
 * @param {string} post.author.name - The name of the author.
 * @param {string} post.author.image - The image URL of the author.
 * @param {string} post.content - The content of the post.
 * @param {string} post.media - The media URL of the post.
 * @param {number} post.id - The ID of the post.
 * @param {number} post.likes - The number of likes for the post.
 * @return {void}
 */
function postGenerator(post) {
    const date = post.created.split('-');
    container.innerHTML += `
    <div class="post">
            <div class="post__header">
                <div class="post-meta">                    
                    <div class="post-meta__icon">
                        <img class="profile-pic" src="${post.author.image}" alt="Phil Mangione">                    
                    </div>
                    <div class="post-meta__data">
                        <div class="post-meta__author">${post.author.name}</div>
                        <div class="post-meta__time">${timeSince(date[2], date[1], date[0])}</div>
                    </div>                    
                </div>
            </div>
            <div class="post__text">${post.content}</div>
            <div class="post__image">
                <img src="${post.media}" alt="">
            </div>
            <div class="post__footer">
                <div class="likes js-likes">
                    <div class="likes__cta">
                        <a class="like-button  js-like-button" data-postid="${post.id}">
                            <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                            <span class="like-button__label">Mi Piace</span>
                        </a>
                    </div>
                    <div class="likes__counter">
                        Piace a <b id="like-counter-${post.id}" class="js-likes-counter">${post.likes}</b> persone
                    </div>
                </div> 
            </div>            
        </div>
    `

    // Set default profile picture
    if (post.author.image === null) {
        const randomColor = Math.floor(Math.random()*16777215).toString(16).padStart(6, 0);
        const icon = document.querySelectorAll('.post-meta__icon')[post.id-1];
        icon.innerHTML = `<div id="profile-pic__default-${post.id}" class="profile-pic">${post.author.name.split(' ')[0][0]}${post.author.name.split(' ')[1][0]}</div>`;
        const profilePic = document.querySelector(`#profile-pic__default-${post.id}`);
        profilePic.style.backgroundColor = `#${randomColor}`;
        profilePic.style.borderRadius = '50%';
        profilePic.style.width = '60px';
        profilePic.style.height = '60px';
        profilePic.style.display = 'flex';
        profilePic.style.alignItems = 'center';
        profilePic.style.justifyContent = 'center';
        profilePic.style.color = 'white';
        profilePic.style.fontWeight = 'bold';
        profilePic.style.fontSize = '24px';
    }
}

/**
 * Calculates the time elapsed since a specific date.
 *
 * @param {number} day - The day of the specified date.
 * @param {number} month - The month of the specified date.
 * @param {number} year - The year of the specified date.
 * @return {string} The time elapsed in the format "X giorni fa" for days less than 30, "X mesi fa" for days less than 365, and "X anni fa" for days greater than 365.
 */
function timeSince(day, month, year) {
    let daySince = 
    ((currentDate.getFullYear() - year) * 365) +
    ((currentDate.getMonth()+1 - month) * 30) +
    (currentDate.getDate() - day);

    if (daySince < 30) {
        return `${daySince} giorni fa`;
    } else if (daySince < 365) {
        return `${Math.floor(daySince/30)} mesi fa`;
    } else {
        return Math.floor(daySince/365) == 1 ? `${Math.floor(daySince/365)} anno fa` : `${Math.floor(daySince/365)} anni fa`;
    }
}
