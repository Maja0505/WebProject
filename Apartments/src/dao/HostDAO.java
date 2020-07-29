package dao;

import java.io.IOException;
import java.util.Collection;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;

import javax.servlet.ServletContext;

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;

import beans.Host;
import beans.User;
import dto.HostDTO;

public class HostDAO {

	private HashMap<String, Host> hosts;
	private GenericCRUD<HostDTO> genericCRUD = new GenericCRUD<HostDTO>();
	
	public HostDAO() {
		
	}
	
	public HostDAO(String contexPath,ServletContext ctx) throws JsonParseException, JsonMappingException, IOException {
		List<HostDTO> hostArrayDTO = genericCRUD.load(contexPath, HostDTO.class);
		hosts = new HashMap<>();
		UserDAO userDAO = (UserDAO) ctx.getAttribute("users");
		Collection<User> users = userDAO.allUsers();
		for (HostDTO hostDTO : hostArrayDTO) {
			for(User user : users) {
				if(user.getUsername().equals(hostDTO.username)) {
					Host host = new Host(user.getUsername(), user.getPassword(), user.getFirstName(), user.getLastName(), user.getGender(), user.getTypeOfUser(), hostDTO.apartmentsForRent);
					hosts.put(host.getUsername(), host);
					break;
				}
			}
		}

	}
	
	public void update(Host host,String path) throws JsonGenerationException, JsonMappingException, IOException {
		HashMap<String, HostDTO> hostDTO = new HashMap<String, HostDTO>();
		for(Host h : allHosts()) {
			hostDTO.put(h.getUsername(), new HostDTO(h.getUsername(),h.getApartmentsForRent()));
		}
		HostDTO newHostDTO = new HostDTO(host.getUsername(), host.getApartmentsForRent());
		genericCRUD.update(hostDTO,newHostDTO, path, host.getUsername());
		hosts.replace(host.getUsername(), hosts.get(host.getUsername()), host);
	}
	
	public Collection<Host> allHosts(){
		return hosts.values();
	}
	
	
	public HashMap<String, Host> getHosts() {
		return hosts;
	}

	public void setHosts(HashMap<String, Host> hosts) {
		this.hosts = hosts;
	}

	public Host find(String username, String password) {
		if (!hosts.containsKey(username)) {
			return null;
		}
		Host host = hosts.get(username);
		if (!host.getPassword().equals(password)) {
			return null;
		}
		return host;
	}
	public void save(Collection<Host> allHosts,Host newHost,String path) throws JsonGenerationException, JsonMappingException, IOException {
		Collection<HostDTO> HostsDTO = new LinkedList<HostDTO>();
		for (Host host : allHosts) {
			HostsDTO.add(new HostDTO(host.getUsername(),host.getApartmentsForRent()));
		}
		genericCRUD.saveAll(HostsDTO, path);
		hosts.put(newHost.getUsername(), newHost);
	}
	
}
