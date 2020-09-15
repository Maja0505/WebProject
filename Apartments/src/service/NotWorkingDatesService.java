package service;

import java.io.IOException;
import java.util.Collection;
import java.util.Date;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;

import dao.NotWorkingDatesDAO;


@Path("/notWorkingDates")
public class NotWorkingDatesService {
	
	@Context
	HttpServletRequest request;
	@Context
	ServletContext ctx; 
	
	@PostConstruct
	public void init() throws JsonParseException, JsonMappingException, IOException {
		if (ctx.getAttribute("notWorkingDates") == null) {
	    	String contextPath = ctx.getRealPath("");
			ctx.setAttribute("notWorkingDates", new NotWorkingDatesDAO(contextPath + "json/notWorkingDates.json"));
		}
	}
	
	@GET
	@Path("/all")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Date> getAllApartments() throws JsonParseException, JsonMappingException, IOException {
		NotWorkingDatesDAO notWorkingDatesDAO = (NotWorkingDatesDAO) ctx.getAttribute("notWorkingDates");
		return notWorkingDatesDAO.getAllDates();
	}
	
	
	
}
