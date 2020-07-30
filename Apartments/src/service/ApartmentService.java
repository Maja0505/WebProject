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
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;

import beans.Apartment;
import beans.Reservation;
import dao.ApartmentDAO;
import dto.ReservationForApartmentDTO;

@Path("/apartments")
public class ApartmentService {

	
	@Context
	HttpServletRequest request;
	@Context
	ServletContext ctx; 
	
	@PostConstruct
	public void init() throws JsonParseException, JsonMappingException, IOException {
		if (ctx.getAttribute("apartments") == null) {
	    	String contextPath = ctx.getRealPath("");
			ctx.setAttribute("apartments", new ApartmentDAO(contextPath + "json/apartment.json"));
		}
	}
	
	@GET
	@Path("/all")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Apartment> getAllApartments() throws JsonParseException, JsonMappingException, IOException {
		ApartmentDAO apartmentDAO = (ApartmentDAO) ctx.getAttribute("apartments");
		return apartmentDAO.allAparmtents();
	}
	
	@POST
	@Path("/addApartment")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public void addApartment(Apartment apartment) throws JsonParseException, JsonMappingException, IOException {
		ApartmentDAO apartmentDAO = (ApartmentDAO) ctx.getAttribute("apartments");
		Collection<Apartment> apartments = new LinkedList<Apartment>();
		for(Apartment a : getAllApartments()) {
			apartments.add(a);
		}
		//Apartment newApartment = new Apartment(apartment.getId(),apartment.getTypeOfApartment(), apartment.getNumberOfRooms(), apartment.getNumberOfGuests(), apartment.getLocation(), null, apartment.getAvailabilityByDates(), apartment.getHost(), apartment.getComments(), apartment.getImages(), apartment.getPricePerNight(), apartment.getCheckInTime(), apartment.getCheckOutTime(), apartment.getStatusOfApartment(), apartment.getAmenities(), apartment.getReservations());
		apartments.add(apartment);
		apartmentDAO.save(apartments,apartment,ctx.getRealPath("") + "json/apartment.json");
	}
	
	@POST
	@Path("/addReservationToApartment")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public void addReservationToApartment(ReservationForApartmentDTO reservationForApartmentDTO) throws JsonParseException, JsonMappingException, IOException{
		ApartmentDAO apartmentDAO = (ApartmentDAO) ctx.getAttribute("apartments");
		Collection<Apartment> apartments = new LinkedList<Apartment>();
		for(Apartment a : getAllApartments()) {
			if(a.getId() == reservationForApartmentDTO.apartment.getId())
			{
				if(a.getReservations() == null) {
					a.setReservations(new ArrayList<Reservation>());
				}
				a.getReservations().add(reservationForApartmentDTO.reservation);
			}
			apartments.add(a);
		}

		apartmentDAO.update(apartments,ctx.getRealPath("") + "json/apartment.json");
	}
}
