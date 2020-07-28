package dao;

import java.io.IOException;
import java.util.Collection;
import java.util.LinkedList;
import java.util.List;

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;

import beans.Comment;

public class CommentDAO {

	private Collection<Comment> comments;
	private GenericCRUD<Comment> genericCRUD = new GenericCRUD<Comment>();
	
	
	public CommentDAO() {
	}

	public CommentDAO(String contexPath) throws JsonParseException, JsonMappingException, IOException {
		comments = new LinkedList<Comment>();
		List<Comment> commentsArray = genericCRUD.load(contexPath, Comment.class);
		for(Comment comment : commentsArray) {
				comments.add(comment);
		}
	}
	
	public void save(Collection<Comment> allComments,Comment newComment,String path) throws JsonGenerationException, JsonMappingException, IOException {
		genericCRUD.saveAll(allComments,path);
		comments.add(newComment);
	}


	public Collection<Comment> allComments() {
		return comments;
	}
	

	public Collection<Comment> getComments() {
		return comments;
	}

	public void setComments(Collection<Comment> comments) {
		this.comments = comments;
	}

	public GenericCRUD<Comment> getGenericCRUD() {
		return genericCRUD;
	}

	public void setGenericCRUD(GenericCRUD<Comment> genericCRUD) {
		this.genericCRUD = genericCRUD;
	}

}
