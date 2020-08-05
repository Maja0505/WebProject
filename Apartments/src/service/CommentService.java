package service;

import java.io.IOException;
import java.util.Collection;
import java.util.LinkedList;
import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import beans.Comment;
import dao.CommentDAO;


@Path("/comments")
public class CommentService {

	@Context
	HttpServletRequest request;
	@Context
	ServletContext ctx; 
	
	@PostConstruct
	public void init() throws JsonParseException, JsonMappingException, IOException {
		if (ctx.getAttribute("comments") == null) {
	    	String contextPath = ctx.getRealPath("");
			ctx.setAttribute("comments", new CommentDAO(contextPath + "json/comment.json"));
		}
	}
	
	@GET
	@Path("/all")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Comment> getAllComments() throws JsonParseException, JsonMappingException, IOException {
		CommentDAO comments = (CommentDAO) ctx.getAttribute("comments");
		return comments.allComments();
	}
	
	@POST
	@Path("/addComment")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public void addComment(Comment comment) throws JsonParseException, JsonMappingException, IOException {
		CommentDAO commentDAO = (CommentDAO) ctx.getAttribute("comments");
		Collection<Comment> comments = new LinkedList<Comment>();
		for(Comment c : getAllComments()) {
			comments.add(c);
		}
		comment.setEnable(true);
		comments.add(comment);
		commentDAO.save(comments,comment,ctx.getRealPath("") + "json/comment.json");
	}
	
	@PUT
	@Path("/updateComment")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public void updateComment(Comment comment) throws JsonGenerationException, JsonMappingException, IOException {
		CommentDAO commentDAO = (CommentDAO) ctx.getAttribute("comments");
		commentDAO.update(comment, ctx.getRealPath("")+"json/comment.json");
	}
	
}
