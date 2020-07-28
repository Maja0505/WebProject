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

import beans.Amenities;
import dao.AmenitiesDAO;

@Path("/amenities")
public class AmneitiesService {

	
	@Context
	HttpServletRequest request;
	@Context
	ServletContext ctx; 
	
	@PostConstruct
	public void init() throws JsonParseException, JsonMappingException, IOException {
		if (ctx.getAttribute("amenities") == null) {
	    	String contextPath = ctx.getRealPath("");
			ctx.setAttribute("amenities", new AmenitiesDAO(contextPath + "json/amenitie.json"));
		}
	}
	
	@GET
	@Path("/all")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Amenities> getAllAmenities() throws JsonParseException, JsonMappingException, IOException {
		AmenitiesDAO amenities = (AmenitiesDAO) ctx.getAttribute("amenities");
		return amenities.allAmenities();
	}
	
	@POST
	@Path("/addAmenitie")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public void addAmenitie(Amenities amenitie) throws JsonParseException, JsonMappingException, IOException {
		AmenitiesDAO amenitiesDAO = (AmenitiesDAO) ctx.getAttribute("amenities");
		Collection<Amenities> amenities = new LinkedList<Amenities>();
		for(Amenities a : getAllAmenities()) {
			amenities.add(a);
		}
		Amenities newAmenitie = new Amenities(amenitie.getId(), amenitie.getName());
		amenities.add(newAmenitie);
		amenitiesDAO.save(amenities,newAmenitie,ctx.getRealPath("") + "json/amenitie.json");
	}
	
}
