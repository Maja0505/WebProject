package service;

import java.io.IOException;
import java.util.Collection;
import java.util.Date;
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

import com.fasterxml.jackson.core.JsonGenerationException;
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
	public Collection<Date> getAllNotWorkingDates() throws JsonParseException, JsonMappingException, IOException {
		NotWorkingDatesDAO notWorkingDatesDAO = (NotWorkingDatesDAO) ctx.getAttribute("notWorkingDates");
		return notWorkingDatesDAO.getAllDates();
	}
	
	@POST
	@Path("/add")
	@Produces(MediaType.APPLICATION_JSON)	
	@Consumes(MediaType.APPLICATION_JSON)
	public void addDates(List<Date> dates) throws JsonGenerationException, JsonMappingException, IOException {
		NotWorkingDatesDAO notWorkingDatesDAO = (NotWorkingDatesDAO) ctx.getAttribute("notWorkingDates");
		notWorkingDatesDAO.save(dates,ctx.getRealPath("") + "json/notWorkingDates.json");
	}
	
}
