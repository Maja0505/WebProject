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
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;

import beans.User;
import dao.GuestDAO;
import dao.HostDAO;
import dao.UserDAO;
import enums.TypeOfUser;

@Path("/users")
public class UserService {

	@Context
	HttpServletRequest request;
	@Context
	ServletContext ctx; 
	
	@PostConstruct
	public void init() throws JsonParseException, JsonMappingException, IOException {
		if (ctx.getAttribute("users") == null) {
	    	String contextPath = ctx.getRealPath("");
			ctx.setAttribute("users", new UserDAO(contextPath + "json/user.json"));
		}
	}
	
	@GET
	@Path("/all")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<User> getAllUsers() throws JsonParseException, JsonMappingException, IOException {
		UserDAO users = (UserDAO) ctx.getAttribute("users");
		return users.allUsers();
	}
	
	@POST
	@Path("/login")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response login(User user) throws JsonParseException, JsonMappingException, IOException {
		UserDAO userDao = (UserDAO) ctx.getAttribute("users");
		User loggedUser = userDao.find(user.getUsername(), user.getPassword());
		if (loggedUser == null) {
			return Response.status(400).entity("Invalid username and/or password").build();
		}
		if(loggedUser.getTypeOfUser().equals(TypeOfUser.GUEST)) {
			if (ctx.getAttribute("guests") == null) {
		    	String contextPath = ctx.getRealPath("");
				ctx.setAttribute("guests", new GuestDAO(contextPath + "json/guest.json",ctx));
			}
			GuestDAO guests = (GuestDAO) ctx.getAttribute("guests");
			loggedUser = guests.find(user.getUsername(), user.getPassword());
		}else if(loggedUser.getTypeOfUser().equals(TypeOfUser.HOST)) {
			if (ctx.getAttribute("hosts") == null) {
		    	String contextPath = ctx.getRealPath("");
				ctx.setAttribute("hosts", new HostDAO(contextPath + "json/host.json",ctx));
			}
			HostDAO hosts = (HostDAO) ctx.getAttribute("hosts");
			loggedUser = hosts.find(user.getUsername(), user.getPassword());
		}
		
		request.getSession().setAttribute("user", loggedUser);
		return Response.status(200).build();
	}
	
	@POST
	@Path("/logout")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public void logout() {
		request.getSession().invalidate();
	}
	
	@GET
	@Path("/currentUser")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public User login() {
		return (User) request.getSession().getAttribute("user");
	}
	
	@POST
	@Path("/addUser")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public void addUser(User user) throws JsonParseException, JsonMappingException, IOException {
		UserDAO userDao = (UserDAO) ctx.getAttribute("users");
		Collection<User> users = new LinkedList<User>();
		for(User u : getAllUsers()) {
			users.add(u);
		}
		User newUser = new User(user.getUsername(), user.getPassword(), user.getFirstName(), user.getLastName(), user.getGender(), TypeOfUser.GUEST);
		users.add(newUser);
		userDao.save(users,newUser,ctx.getRealPath("") + "json/user.json");
	}
}
