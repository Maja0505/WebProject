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

import beans.Amenities;
import dao.AmenitiesDAO;

@Path("/amenities")
public class AmenitiesService {

	
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
		amenitiesDAO.save(amenitie,ctx.getRealPath("") + "json/amenitie.json");
	}
	
	@PUT
	@Path("/updateAmenitie")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public void updateAmenitie(Amenities amenitie) throws JsonGenerationException, JsonMappingException, IOException {
		AmenitiesDAO amenitiesDAO = (AmenitiesDAO) ctx.getAttribute("amenities");
		amenitiesDAO.update(amenitie, ctx.getRealPath("")+"json/amenitie.json");
	}
}
