package service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

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

import beans.Location;
import dao.LocationDAO;

@Path("/locations")
public class LocationService {

	
	@Context
	HttpServletRequest request;
	@Context
	ServletContext ctx; 
	
	@PostConstruct
	public void init() throws JsonParseException, JsonMappingException, IOException {
		if (ctx.getAttribute("locations") == null) {
	    	String contextPath = ctx.getRealPath("");
			ctx.setAttribute("locations", new LocationDAO(contextPath + "json/location.json"));
		}
	}
	
	@GET
	@Path("/all")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Location> getAllLocations() throws JsonParseException, JsonMappingException, IOException {
		LocationDAO locationDAO = (LocationDAO) ctx.getAttribute("locations");
		return locationDAO.allLocations();
	}
	
	@POST
	@Path("/addLocation")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public void addLocation(Location location) throws JsonParseException, JsonMappingException, IOException {
		LocationDAO locationDAO = (LocationDAO) ctx.getAttribute("locations");
		List<Location> locations = new ArrayList<Location>();
		for(Location l : getAllLocations()) {
			locations.add(l);
		}
		Location newLocation = new Location(location.getLatitude(), location.getLongitude(), location.getAddress());
		locations.add(newLocation);
		locationDAO.save(locations,newLocation,ctx.getRealPath("") + "json/location.json");
	}

}
