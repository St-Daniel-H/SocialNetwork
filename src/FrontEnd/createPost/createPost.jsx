import {useState} from 'react'
function CreatePost(){
   const [title,setTitle] = useState("Title");
   const [summary,setSummary] = useState("Summary");
   function createNewPost(ev){
    ev.preventDefault();
   }
    return (
      <form id="CreatePost">
        <h1>What's on your mind?</h1>
        <div id="createPostForm">
          <input placeholder="Title"
          valye = {title}
          onChange={(ev)=> setTitle(ev.target.value)}
          type="text"></input>
          
          <input 
          placeholder="Summary"
          valye = {summary}
          onChange={(ev)=> setSummary(ev.target.value)}
          type="text"></input>

          <input placeholder="Image" type="file"></input>

          <button onClick={createNewPost}>Create Post</button>
        </div>
      </form>
    );
}
export default CreatePost;