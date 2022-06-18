const Category = require('./../models/Category');

const all = async () => {
	return await Category.find();
};

const create = async (data) => {
	const checkSlugResults = await searchBySlug(data.slug);

	const category = await new Category({
		title: data.title,
		slug: checkSlugResults > 0 ? `${data.slug}-${checkSlugResults}` : data.slug,
	}).save();

	return {
		category,
	};
};

const update = async (id, data) => {
	const category = await Category.findOneAndUpdate(
		{ id },
		{
			$set: {
				title: data.title,
				slug: data.slug,
			},
		},
		{ new: true }
	);

	return {
		category,
	};
};

const deleteCategory = async (id) => {
	const category = await Category.findByIdAndDelete(id).orFail();

	return {
		category,
	};
};

const searchBySlug = async (slug) => {
	const searchInput = new RegExp(slug, 'i');
	const searchedResults = await Category.find({
		slug: {
			$regex: searchInput,
		},
	});

	return searchedResults.length;
};

const getBySlug = async (slug) => {
	return await Category.findOne({
		slug,
	});
};

module.exports = {
	all,
	create,
	update,
	deleteCategory,
	getBySlug,
};
