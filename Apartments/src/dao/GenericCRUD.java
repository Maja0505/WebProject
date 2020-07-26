package dao;

import java.io.File;
import java.io.IOException;
import java.util.Collection;
import java.util.List;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;




public class GenericCRUD<T>{
	

	public GenericCRUD() {
		super();
	}


	public List<T> load(String path) throws JsonParseException, JsonMappingException, IOException {
		ObjectMapper objectMapper = new ObjectMapper();
		List<T> entities = objectMapper.readValue(new File(path), new TypeReference<List<T>>(){});		
		return entities;
	}
	
	
	public void delete(T entity,String path) {}
	
	public void update(T entity,String path) {}
	
	public void saveAll(Collection<T> entities) {}
	
};
