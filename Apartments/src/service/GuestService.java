package service;

import java.io.IOException;
import java.util.Collection;

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

import beans.Guest;
import beans.User;
import dao.GuestDAO;


@Path("/guests")
public class GuestService {

	@Context
	HttpServletRequest request;
	@Context
	ServletContext ctx; 
	
	@PostConstruct
	public void init() throws JsonParseException, JsonMappingException, IOException {
		if (ctx.getAttribute("guests") == null) {
	    	String contextPath = ctx.getRealPath("");
			ctx.setAttribute("guests", new GuestDAO(contextPath + "json/guest.json",ctx));
		}
	}
	
	@GET
	@Path("/all")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Guest> getAllGuests() throws JsonParseException, JsonMappingException, IOException {
		GuestDAO guests = (GuestDAO) ctx.getAttribute("guests");
		return guests.allGuests();
	}
	
	@POST
	@Path("/addGuest")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public void addGuest(User user) throws JsonParseException, JsonMappingException, IOException {
		GuestDAO GuestDAO = (GuestDAO) ctx.getAttribute("guests");
		GuestDAO.save(user,ctx.getRealPath("") + "json/guest.json");
	}
	
	@PUT
	@Path("/updateGuest")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public void updateGuest(Guest guest) throws JsonGenerationException, JsonMappingException, IOException {
		GuestDAO guestDAO = (GuestDAO) ctx.getAttribute("guests");
		guestDAO.update(guest, ctx.getRealPath("")+"json/guest.json");
		request.getSession().setAttribute("user", guest);
	}
}
