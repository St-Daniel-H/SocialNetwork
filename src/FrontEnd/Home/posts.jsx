import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { formatISO9075, format } from 'date-fns';
import { useState, useEffect } from 'react';
import './posts.scss';
import { Link } from 'react-router-dom';
import userDefaultImage from './default_profile_picture.png';
import image from '../login/picture.jpg';
import ToggleButton from '@mui/material/ToggleButton';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';
import SwipeableEdgeDrawer from './commentsDrawer';
import CommentSection from './commentsDrawer';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

function Posts({
  _id,
  title,
  summary,
  cover,
  posterId,
  createdAt,
  likes,
  comments,
  userId,
}) {
  //for readmore button for summary
  const [readMore, setReadMore] = useState(false);
  console.log('user id is that was imported from home: ' + userId);
  //const userId = useSelector((state) => state.user.user_id);
  const [commentsCount, setCommentsCount] = useState(0);
  const [postLikes, setPostLikes] = useState([...likes]);
  const [likesCount, setLikesCount] = useState(postLikes.length);
  const [selected, setSelected] = useState(false);
  console.log();
  const [name, setName] = useState('Unavailable');
  const [image, setImage] = useState('');
  const [commentsButton, setCommentsButton] = useState(false);
  console.log(commentsCount + ' is the comment count');
  //for three dots
  let screen_user_Id = useSelector((state) => state.user.user_id);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  async function handleCloseAndDelete() {
    const req = await fetch('http://localhost:5000/DeletePost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        postId: _id,
      }),
    });
    const data = await req.json();
    if (data.status === 'Ok') {
      alert('post deleted');
      window.location.reload();
    } else {
      alert(data.error);
    }
    setAnchorEl(null);
  }
  const handleClose = () => {
    setAnchorEl(null);
  };
  //end for three dots
  //for like button
  async function addRemoveLike() {
    try {
      if (selected) {
        setLikesCount(likesCount - 1);
        const req = await fetch('http://localhost:5000/post/dislike', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: userId,
            postId: _id,
          }),
        });
      } else {
        setLikesCount(likesCount + 1);
        const req = await fetch('http://localhost:5000/post/like', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: userId,
            postId: _id,
          }),
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  //ent for likes
  //for comments
  //end for comments

  async function getUserNameAndImage() {
    const req = await fetch('http://localhost:5000/api/FindUserId', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: posterId,
      }),
    });
    const data = await req.json();
    if (data.status === 'Ok') {
      setName(data.name);
      setImage(data.picture);
    } else {
      alert(data.error);
    }
  }
  useEffect(() => {
    getUserNameAndImage();
    checkIfUserLikedImage();
  }, [likes, userId]);
  async function checkIfUserLikedImage() {
    const req = await fetch('http://localhost:5000/api/getPostLikes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        postId: _id,
      }),
    });
    const postLikes = await req.json();
    console.log('from backend' + postLikes);
    if (postLikes.status === 'Ok') {
      setPostLikes([...postLikes.likes]);
      setCommentsCount(postLikes.comments.length);
    } else {
      alert(data.error);
    }
    setLikesCount(postLikes.likes.length);

    if (postLikes.likes.includes(userId)) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  }
  return (
    <div id='postCard'>
      <div id='postUserInfo'>
        <img id='PosterImage' src={image || userDefaultImage}></img>

        <div id='posterNameAndDate'>
          <div id='NameAndDots'>
            <Link to={'/user/' + posterId}>
              <h4 id='PosterName'>{name}</h4>
            </Link>{' '}
            {posterId == screen_user_Id && (
              <div id='threedots'>
                {' '}
                <div
                  className='toolcase'
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup='true'
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                >
                  <MoreVertIcon />
                </div>
                <Menu
                  id='basic-menu'
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem onClick={handleCloseAndDelete}>Delete </MenuItem>
                  <MenuItem onClick={handleClose}>Edit </MenuItem>
                </Menu>{' '}
              </div>
            )}
          </div>
          <time id='postDate'>
            {format(new Date(createdAt), 'MMM d, yyyy HH:mm')}
          </time>
        </div>
      </div>
      <div id='title'>
        <h4>{title}</h4>
      </div>
      <div id='Summary'>
        {summary.length > 100 && readMore == false ? (
          <p>
            {summary.substring(0, 100)}{' '}
            <button
              onClick={() => {
                setReadMore(true);
                console.log(readMore);
              }}
              className='readMore'
            >
              read more
            </button>
          </p>
        ) : summary.length > 100 && readMore == true ? (
          <p>
            {summary}{' '}
            <button
              onClick={() => {
                setReadMore(false);
                console.log(readMore);
              }}
              className='readMore'
            >
              read less
            </button>
          </p>
        ) : (
          summary
        )}
      </div>
      {cover && (
        <div id='image'>
          {' '}
          <img src={cover}></img>
        </div>
      )}
      <div id='buttons'>
        <div id='like'>
          <div>
            <ToggleButton
              id='likeButton'
              style={
                selected
                  ? {
                      color: '#9c27b0',
                    }
                  : {
                      color: 'white',
                      ':hover': {
                        cursor: 'pointer',
                        color: '#9c27b0',
                      },
                    }
              }
              color='secondary'
              value='check'
              selected={selected}
              onChange={() => {
                setSelected(!selected);
                addRemoveLike();
              }}
            >
              <ThumbUpOffAltIcon />
            </ToggleButton>
            {/* <button className="postButtons" id="like" onClick={LikePost()}>
              <ThumbUpOffAltIcon />
            </button> */}
          </div>
          <div>
            <p>{likesCount}</p>
          </div>
        </div>
        {/* <div id="borderBetweenLikeAndComment"></div> */}
        <div id='comment'>
          <div>
            <Button
              id='commentsButton'
              onClick={() => {
                document.body.style.overflow = 'hidden';
                setCommentsButton(true);
              }}
              color='secondary'
              variant='text'
            >
              <ChatBubbleOutlineIcon />
            </Button>

            {/* </ToggleButton> */}
            {/* <SwipeableEdgeDrawer /> */}
          </div>
          {/* <button className="postButtons">
            <ChatBubbleOutlineIcon />
          </button> */}
          <div>
            <p>{commentsCount}</p>
          </div>
        </div>
      </div>
      <CommentSection
        postId={_id}
        commentsId={comments}
        trigger={commentsButton}
        commentsCount={commentsCount}
        setCommentsCount={setCommentsCount}
        setTrigger={setCommentsButton}
      />
    </div>
  );
}
export default Posts;
