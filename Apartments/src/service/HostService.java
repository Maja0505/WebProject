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

import beans.Host;
import beans.User;
import dao.HostDAO;

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
		hostDao.save(user,ctx.getRealPath("") + "json/host.json");
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
