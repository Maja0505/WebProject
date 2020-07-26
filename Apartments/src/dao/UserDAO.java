package dao;

import java.io.IOException;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;

import beans.User;

public class UserDAO{

	private HashMap<String, User> users = new HashMap<String, User>();
	private GenericCRUD<User> genericCRUD = new GenericCRUD<User>();
	
	public UserDAO(){
		super();
	}
	
	public UserDAO(String contexPath) throws JsonParseException, JsonMappingException, IOException{
		List<User> array = genericCRUD.load(contexPath);
		for (int i = 0; i < array.size(); i++) {
			users.put(array.get(i).getUsername(),array.get(i));
		}
		
	}

	public Collection<User> allUsers(){
		return users.values();
	}
	
	
	public HashMap<String, User> getUsers() {
		return users;
	}

	public void setUsers(HashMap<String, User> users) {
		this.users = users;
	}
	
	
}
