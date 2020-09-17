package dao;

import java.io.IOException;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import beans.Comment;

public class CommentDAO {

	private HashMap<String,Comment> comments;
	private GenericCRUD<Comment> genericCRUD = new GenericCRUD<Comment>();
	
	
	public CommentDAO() {
	}

	public CommentDAO(String contexPath) throws JsonParseException, JsonMappingException, IOException {
		comments = new HashMap<String, Comment>();
		List<Comment> commentsArray = genericCRUD.load(contexPath, Comment.class);
		for(Comment comment : commentsArray) {
				comments.put(comment.getId(),comment);
		}
	}
	
	public void save(Comment newComment,String path) throws JsonGenerationException, JsonMappingException, IOException {
		newComment.setEnable(true);
		comments.put(newComment.getId(),newComment);
		genericCRUD.saveAll(allComments(),path);
		
	}
	
	public void update(Comment comment,String path) throws JsonGenerationException, JsonMappingException, IOException {
		genericCRUD.update(comments, comment, path, comment.getId());
		comments.replace(comment.getId(), comments.get(comment.getId()), comment);
	}


	public Collection<Comment> allComments() {
		return comments.values();
	}
	
	public HashMap<String, Comment> getComments() {
		return comments;
	}

	public void setComments(HashMap<String, Comment> comments) {
		this.comments = comments;
	}

	public GenericCRUD<Comment> getGenericCRUD() {
		return genericCRUD;
	}

	public void setGenericCRUD(GenericCRUD<Comment> genericCRUD) {
		this.genericCRUD = genericCRUD;
	}

}
