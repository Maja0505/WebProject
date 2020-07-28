package service;

import java.io.IOException;
import java.util.ArrayList;
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

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;

import beans.Apartment;
import beans.Guest;
import beans.Reservation;
import beans.User;
import dao.GuestDAO;
import enums.TypeOfUser;


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
	public void addUser(User user) throws JsonParseException, JsonMappingException, IOException {
		GuestDAO GuestDAO = (GuestDAO) ctx.getAttribute("guests");
		Collection<Guest> guests = new LinkedList<Guest>();
		for(Guest u : getAllGuests()) {
			guests.add(u);
		}
		Guest newGuest = new Guest(user.getUsername(), user.getPassword(), user.getFirstName(), user.getLastName(),
				user.getGender(), TypeOfUser.GUEST,new ArrayList<Apartment>(),new ArrayList<Reservation>());
		guests.add(newGuest);
		GuestDAO.save(guests,newGuest,ctx.getRealPath("") + "json/guest.json");
	}
}
