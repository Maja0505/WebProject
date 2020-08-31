package service;

import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Collection;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.imageio.ImageIO;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;

import beans.Apartment;
import dao.ApartmentDAO;



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
		List<Apartment> apartments = new ArrayList<Apartment>();
		for(Apartment a : getAllApartments()) {
			apartments.add(a);
		}
		apartments.add(apartment);
		apartmentDAO.save(apartments,apartment,ctx.getRealPath("") + "json/apartment.json");
	}
	
	@POST
	@Path("/changeSelectedApartment")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public void setSessionForApartment(Apartment apartment) {
		request.getSession().setAttribute("selectedApartment", apartment);
	}
	
	@GET
	@Path("/currentSelectedApartment")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Apartment getSelectedApartment() {
		return (Apartment) request.getSession().getAttribute("selectedApartment");
	}
	
	@PUT
	@Path("/updateApartment")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public void updateApartment(Apartment apartment) throws JsonGenerationException, JsonMappingException, IOException {
		ApartmentDAO apartmentDAO = (ApartmentDAO) ctx.getAttribute("apartments");
		apartmentDAO.update(apartment, ctx.getRealPath("")+"json/apartment.json");
	}
	
	@POST
	@Path("/saveImage/{imageName}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public void saveImage(String  fromBase64,@PathParam("imageName") String name) throws JsonParseException, JsonMappingException, IOException {
		
		 name = URLDecoder.decode(name, "UTF-8");
		 String fileName = ctx.getRealPath("")+"images";
		 String base64Image = fromBase64.split(",")[1];
		 byte[] imageBytes = javax.xml.bind.DatatypeConverter.parseBase64Binary(base64Image);
		 File imgFile = new File(fileName + "/" + name);  
         BufferedImage img = ImageIO.read(new ByteArrayInputStream(imageBytes));  
         ImageIO.write(img, "png", imgFile);  
		
	}

	@PUT
	@Path("/updateAllApartments")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public void updateApartments(List<Apartment> apartments) throws JsonGenerationException, JsonMappingException, IOException {
		ApartmentDAO apartmentDAO = (ApartmentDAO) ctx.getAttribute("apartments");
		apartmentDAO.updateAllApartments(apartments, ctx.getRealPath("")+"json/apartment.json");

	}
	
	
}
