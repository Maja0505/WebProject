package dao;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.CollectionType;



public class GenericCRUD<E>{
	

	public GenericCRUD() {
		super();
	}

	public List<E> load(String path, Class<E> classType) throws JsonParseException, JsonMappingException, IOException {	
		ObjectMapper mapper = new ObjectMapper();
		CollectionType listType = mapper.getTypeFactory().constructCollectionType(ArrayList.class, classType);
		List<E> entities = mapper.readValue(new File(path), listType);
		return entities;
	}
	
	public void delete(E entity,String path) {}
	
	public void update(E entity,String path) {}
	
	public void saveAll(Collection<E> entities,String path) throws JsonGenerationException, JsonMappingException, IOException {
		ObjectMapper mapper = new ObjectMapper();
		mapper.writeValue(Paths.get(path).toFile(), entities);
	}
	
};
