package service;

import java.io.IOException;
import java.util.Collection;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;

import beans.User;
import dao.UserDAO;

@Path("users")
public class UserService {

	@Context
	HttpServletRequest request;
	@Context
	ServletContext ctx; 
	
	@GET
	@Path("/all")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<User> getAllUsers() throws JsonParseException, JsonMappingException, IOException {
		UserDAO users = (UserDAO) ctx.getAttribute("users");
		if(users == null) {
			users = new UserDAO("C:\\Users\\NEMANJA\\Desktop\\WEB_Project\\Apartments\\WebContent\\json\\user.json");
			ctx.setAttribute("users", users);
		}
		return users.allUsers();
	}
	
}
