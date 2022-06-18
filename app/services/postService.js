const slugify = require('slugify');

const Post = require('./../models/Post');

const all = async () => {
	return await Post.find();
};

const create = async (userId, data) => {
	const slug = slugify(data.title, '-');

	const checkSlugResults = await searchBySlug(slug);

	const post = await new Post({
		title: data.title,
		description: data.description,
		author: userId,
		slug: checkSlugResults > 0 ? `${slug}-${checkSlugResults}` : slug,
	}).save();

	return {
		post,
	};
};

const update = async (id, data) => {
	const post = await Post.findOneAndUpdate(
		{ id },
		{
			$set: {
				description: data.description,
			},
		},
		{ new: true }
	);

	return {
		post,
	};
};

const like = async (slug) => {
	const getPostBySlug = await Post.findOne({ slug });

	const post = await Post.findOneAndUpdate(
		{ _id: getPostBySlug.id },
		{
			$set: {
				liked: ++getPostBySlug.liked,
			},
		},
		{ new: true }
	);

	return {
		post,
	};
};

const deletePost = async (id) => {
	const post = await Post.findOneAndDelete({
		_id: id,
	}).orFail();

	return {
		post,
	};
};

const searchBySlug = async (slug) => {
	const searchInput = new RegExp(slug, 'i');
	const searchedResults = await Post.find({
		slug: {
			$regex: searchInput,
		},
	});

	return searchedResults.length;
};

const getBySlug = async (slug) => {
	return await Post.findOne({
		slug,
	});
};

const checkIfUserIsAuth = async (user, id) => {
	return (
		user.role == 'admin' ||
		(await Post.findOne({
			id,
			author: user.id,
		}))
	);
};

const isNotAllowed = async (user, slug) => {
	return !!(await Post.findOne({
		slug,
		author: user.id,
	}));
};

module.exports = {
	all,
	create,
	update,
	deletePost,
	getBySlug,
	checkIfUserIsAuth,
	isNotAllowed,
	like,
};
