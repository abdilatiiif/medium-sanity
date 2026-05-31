function Comments() {
  return (
    <form>
      <label>
        <span>Name</span>
        <input type="text" placeholder="John Doe" />
      </label>
      <label>
        <span>Email</span>
        <input type="email" placeholder="john.doe@example.com" />
      </label>
      <label>
        <span>Comment</span>
        <textarea placeholder="Write your comment here..."></textarea>
      </label>
        <button type="submit">Submit</button>
    </form>
  );
}

export default Comments;
