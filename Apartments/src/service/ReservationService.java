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

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;

import beans.Reservation;
import dao.ReservationDAO;

@Path("/reservations")
public class ReservationService {
	
	@Context
	HttpServletRequest request;
	@Context
	ServletContext ctx; 
	
	@PostConstruct
	public void init() throws JsonParseException, JsonMappingException, IOException {
		if (ctx.getAttribute("reservations") == null) {
	    	String contextPath = ctx.getRealPath("");
			ctx.setAttribute("reservations", new ReservationDAO(contextPath + "json/reservation.json"));
		}
	}
	
	@GET
	@Path("/all")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Reservation> getAllReservations() throws JsonParseException, JsonMappingException, IOException {
		ReservationDAO reservations = (ReservationDAO) ctx.getAttribute("reservations");
		return reservations.allReservations();
	}
	
	@POST
	@Path("/addReservation")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public void addReservation(Reservation reservation) throws JsonParseException, JsonMappingException, IOException {
		ReservationDAO reservationDAO = (ReservationDAO) ctx.getAttribute("reservations");
		Collection<Reservation> reservations = new LinkedList<Reservation>();
		for(Reservation r : getAllReservations()) {
			reservations.add(r);
		}
		Reservation newReservation = new Reservation(reservation.getApartment(),reservation.getStartDateOfReservation(),reservation.getNumberOfNights(),reservation.getFullPrice(),reservation.getReservationMessage(),reservation.getGuest(),reservation.getStatusOfReservation());
		reservations.add(newReservation);
		reservationDAO.save(reservations,newReservation,ctx.getRealPath("") + "json/reservation.json");
	}
}
