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
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import com.fasterxml.jackson.core.JsonGenerationException;
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
	public void addGuest(User user) throws JsonParseException, JsonMappingException, IOException {
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
	
/*
	@POST
	@Path("/addReservationToGuest")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public void addReservationToGuest(GuestReservationDTO guestReservationDTO) throws JsonParseException, JsonMappingException, IOException {
		GuestDAO guestDAO = (GuestDAO) ctx.getAttribute("guests");
		Collection<Guest> guests = new LinkedList<Guest>();		
		for(Guest g : getAllGuests()) {
			if(g.getUsername().equals(guestReservationDTO.guest.getUsername()))
			{
				if(g.getReservations() == null) {
					g.setReservations(new ArrayList<Reservation>());
				}
				g.getReservations().add(guestReservationDTO.reservation);
			}
			guests.add(g);
		}
		
		guestDAO.update(guests,ctx.getRealPath("") + "json/guest.json");
	}
	
	@POST
	@Path("/addApartmentToGuest")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public void addApartmentToHost(GuestApartmentDTO guestApartmentDTO) throws JsonParseException, JsonMappingException, IOException {
		GuestDAO guestDAO = (GuestDAO) ctx.getAttribute("guests");
		Collection<Guest> guests = new LinkedList<Guest>();		
		for(Guest g : getAllGuests()) {
			if(g.getUsername().equals(guestApartmentDTO.guest.getUsername()))
			{
				if(g.getRentedApartments() == null) {
					g.setRentedApartments(new ArrayList<Apartment>());
				}
				g.getRentedApartments().add(guestApartmentDTO.apartment);
			}
			guests.add(g);
		}
		
		guestDAO.update(guests,ctx.getRealPath("") + "json/guest.json");
	}*/

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
