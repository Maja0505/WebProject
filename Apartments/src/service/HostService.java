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
import beans.Host;
import beans.User;
import dao.HostDAO;
import dto.HostApartmentDTO;
import enums.TypeOfUser;

@Path("/hosts")
public class HostService {

	
	@Context
	HttpServletRequest request;
	@Context
	ServletContext ctx; 
	
	@PostConstruct
	public void init() throws JsonParseException, JsonMappingException, IOException {
		if (ctx.getAttribute("hosts") == null) {
	    	String contextPath = ctx.getRealPath("");
			ctx.setAttribute("hosts", new HostDAO(contextPath + "json/host.json",ctx));
		}
	}
	
	@GET
	@Path("/all")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Host> getAllHosts() throws JsonParseException, JsonMappingException, IOException {
		HostDAO hosts = (HostDAO) ctx.getAttribute("hosts");
		return hosts.allHosts();
	}
	
	@POST
	@Path("/addHost")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public void addHost(User user) throws JsonParseException, JsonMappingException, IOException {
		HostDAO hostDao = (HostDAO) ctx.getAttribute("hosts");
		Collection<Host> hosts = new LinkedList<Host>();
		for(Host h : getAllHosts()) {
			hosts.add(h);
		}
		Host newHost = new Host(user.getUsername(), user.getPassword(), user.getFirstName(), user.getLastName(),
				user.getGender(), TypeOfUser.HOST,new ArrayList<Apartment>());
		hosts.add(newHost);
		
		hostDao.save(hosts,newHost,ctx.getRealPath("") + "json/host.json");
	}
	

	@POST
	@Path("/addApartmentToHost")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public void addApartmentToHost(HostApartmentDTO hostApartmentDTO) throws JsonParseException, JsonMappingException, IOException {
		HostDAO hostDao = (HostDAO) ctx.getAttribute("hosts");
		Collection<Host> hosts = new LinkedList<Host>();		
		for(Host h : getAllHosts()) {
			if(h.getUsername().equals(hostApartmentDTO.host.getUsername()))
			{
				if(h.getApartmentsForRent() == null) {
					h.setApartmentsForRent(new ArrayList<Apartment>());
				}
				h.getApartmentsForRent().add(hostApartmentDTO.apartment);
			}
			hosts.add(h);
		}
		
		hostDao.update(hosts,ctx.getRealPath("") + "json/host.json");
	}

	@PUT
	@Path("/updateHost")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public void updateHost(Host host) throws JsonGenerationException, JsonMappingException, IOException {
		HostDAO hostDAO = (HostDAO) ctx.getAttribute("hosts");
		hostDAO.update(host, ctx.getRealPath("")+"json/host.json");
		request.getSession().setAttribute("user", host);

	}
}
