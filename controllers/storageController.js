const db = require("../db"),
			fs = require("fs"),
			busboy = require("connect-busboy");

exports.storage = (req, res) => {
	db("storage_users")
		.where("user_id", req.user.id)
		.first()
		.then((users) => {
			if (users) {
				res.redirect("/storage/" + req.user.id)
			} else {
				res.render("storage/storageStart", {currentUser: req.user});
			}
		})
}

exports.startStorage = (req, res) => {
    db("users")
        .where("user_code", req.body.referrer_code)
        .first()
        .then((user) => {
            if (user) {
                db("storage_users")
                    .insert({
                        user_id: req.user.id,
                        referrer_code: req.body.referrer_code
                    })
                    .then(() => {
                        const storageId = Math.floor(Math.random() * 1000000); // Generate a random ID
                        db("storage")
                            .insert({
                                owner_id: req.user.id,
                                storage_id: storageId
                            })
                            .then(() => {
                                res.redirect("/storage/" + req.user.id);
                            });
                    });
            } else {
                // flash message: please enter valid referrer_code
                res.redirect("back");
            }
        })
        .catch((error) => {
            console.error("Error starting storage:", error);
            res.status(500).send("Internal Server Error");
        });
};
exports.storageHome = (req, res, next) => {
    db("storage")
        .innerJoin("users", "storage.owner_id", "users.id")
        .leftJoin("storage_files", "storage.storage_id", "storage_files.source_id")
        .where("owner_id", req.params.user_id)
        .then((storageInfo) => {
            if (!storageInfo.length) {
                return res.status(404).send('Storage not found');
            }

            db("storage_users_storage")
                .innerJoin("users", "storage_users_storage.user_id", "users.id")
                .innerJoin("storage", "storage_users_storage.source_id", "storage.storage_id")
                .where("owner_id", req.params.user_id)
                .then((usersInStorage) => { 
                    db("storage")
                        .innerJoin("users", "storage.owner_id", "users.id")
                        .innerJoin("storage_users_storage", "storage.storage_id", "storage_users_storage.source_id")
                        .where("user_id", req.user.id)
                        .then((invitedStorages) => {
                            db("storage_folders")
                                .leftJoin("storage_folders_users", "storage_folders.id", "storage_folders_users.source_id")
                                .where("storage_id", storageInfo[0].storage_id)
                                .then((folders) => {
                                    var isLeader = false;
                                    if (req.params.user_id == req.user.id) {
                                        isLeader = true;
                                    }
									console.log("folders",folders)
                                    res.render("storage/storagePage", {
                                        currentUser: req.user,
                                        isLeader,
                                        storageInfo,
                                        usersInStorage,
                                        invitedStorages,
                                        folders
                                    });
                                })
                                .catch(err => {
                                    console.error("Error fetching folders:", err);
                                    res.status(500).send("Internal Server Error");
                                });
                        })
                        .catch(err => {
                            console.error("Error fetching invited storages:", err);
                            res.status(500).send("Internal Server Error");
                        });
                })
                .catch(err => {
                    console.error("Error fetching users in storage:", err);
                    res.status(500).send("Internal Server Error");
                });
        })
        .catch(err => {
            console.error("Error fetching storage info:", err);
            res.status(500).send("Internal Server Error");
        });
}
exports.inviteUser = (req, res) => {
	db("users")
		.where("username", req.body.username)
		.first()
		.then((user) => {
			if (user) {
				db("storage_users_storage")
					.insert({
						user_id: user.id,
						source_id: req.params.storage_id
					})
					.then(() => {
						res.redirect("back")
					})
			} else {
				res.redirect("back")
			}
		})
}

exports.removeUserFromStorage = (req, res) => {
	db("storage_users_storage")
		.where({source_id: req.params.storage_id, user_id: req.body.user_id})
		.del()
		.then(() => {
			res.redirect("back")
		})
}

exports.upload = (req, res) => {
    var fstream;
    req.pipe(req.busboy);
    req.busboy.on("file", (fieldName, file, fileName) => {
        const filePath = path.join(__dirname, '../public/storage/root', fileName);
        if (!fs.existsSync(path.join(__dirname, '../public/storage/root'))) {
            fs.mkdirSync(path.join(__dirname, '../public/storage/root'), { recursive: true });
        }
        fstream = fs.createWriteStream(filePath);
        file.pipe(fstream);
        fstream.on("close", () => {
            db("storage_files")
                .insert({
                    source_id: req.params.storage_id,
                    file: fileName
                })
                .then(() => {
                    res.redirect("back");
                })
                .catch(err => {
                    console.error('Error inserting file record:', err);
                    res.status(500).send('Internal Server Error');
                });
        });
    });
};
exports.deleteFile = (req, res) => {
    const fileId = req.body.fileId;

    // Fetch the file information from the database
    db('storage_files')
        .where('id', fileId)
        .first()
        .then(file => {
            if (!file) {
                return res.status(404).send('File not found');
            }

            // Construct the file path
            const filePath = path.join(__dirname, '../public/storage/root', file.file);

            // Attempt to delete the file from the filesystem
            fs.unlink(filePath, err => {
                if (err && err.code !== 'ENOENT') {
                    console.error('Error deleting file:', err);
                    return res.status(500).send('Error deleting file');
                }

                // Delete the file information from the database
                db('storage_files')
                    .where('id', fileId)
                    .del()
                    .then(() => {
                        res.redirect('back');
                    })
                    .catch(err => {
                        console.error('Error deleting file information from the database:', err);
                        res.status(500).send('Error deleting file information from the database');
                    });
            });
        })
        .catch(err => {
            console.error('Error fetching file information from the database:', err);
            res.status(500).send('Error fetching file information from the database');
        });
};
exports.createFolder = (req, res) => {
    db("storage_folders")
        .insert({
            owner_id: req.params.owner_id,
            title: req.body.title,
            storage_id: req.params.storage_id,
        })
        .then((folderId) => {
            db("storage_folders_users")
                .insert({
                    user_id: req.user.id,
                    source_id: folderId[0] // Ensure the correct folder ID is used
                })
                .then(() => {
                    res.redirect("back");
                })
                .catch(err => {
                    console.error('Error inserting folder user record:', err);
                    res.status(500).send('Internal Server Error');
                });
        })
        .catch(err => {
            console.error('Error creating folder:', err);
            res.status(500).send('Internal Server Error');
        });
};
exports.eachFolder = (req, res) => {
    db("storage_folders")
        .where("id", req.params.folder_id)
        .first()
        .then((folders) => {
            if (!folders) {
                return res.status(404).send('Folder not found');
            }

            db("storage_folders_users")
                .innerJoin("users", "storage_folders_users.user_id", "users.id")
                .where("source_id", req.params.folder_id)
                .then((usersInFolder) => {
                    db("storage_folder_files")
                        .where("source_id", req.params.folder_id)
                        .then((files) => {
                            var isLeader = false;
                            if (folders.owner_id == req.user.id) {
                                isLeader = true;
                            }
                            res.render("storage/eachFolder", {
                                currentUser: req.user,
                                folders,
                                isLeader,
                                files,
                                usersInFolder
                            });
                        })
                        .catch(err => {
                            console.error('Error fetching files:', err);
                            res.status(500).send('Internal Server Error');
                        });
                })
                .catch(err => {
                    console.error('Error fetching users in folder:', err);
                    res.status(500).send('Internal Server Error');
                });
        })
        .catch(err => {
            console.error('Error fetching folder:', err);
            res.status(500).send('Internal Server Error');
        });
};

exports.inviteUserToFolder = (req, res) => {
	db("users")
		.where("username", req.body.username)
		.first()
		.then((user) => {
			if (user) {
				db("storage_folders_users")
					.insert({
						user_id: user.id,
						source_id: req.params.folder_id
					})
					.then(() => {
						res.redirect("back")
					})
			} else {
				res.redirect("back")
			}
		})
}

exports.removeUserFromFolder = (req, res) => {
	db("storage_folders_users")
		.where({source_id: req.params.folder_id, user_id: req.body.user_id})
		.del()
		.then(() => {
			res.redirect("back")
		})
}

const path = require('path');

exports.uploadInFolder = (req, res) => {
    var fstream;
    req.pipe(req.busboy);
    req.busboy.on("file", (fieldName, file, fileName) => {
        const folderPath = path.join(__dirname, '../public/storage/folders', req.params.folder_id);
        const filePath = path.join(folderPath, fileName);
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
        }
        fstream = fs.createWriteStream(filePath);
        file.pipe(fstream);
        fstream.on("close", () => {
            db("storage_folder_files")
                .insert({
                    file_name: fileName,
                    file_path: filePath, // Include the file_path field
                    source_id: req.params.folder_id
                })
                .then(() => {
                    res.redirect("/storage/" + req.params.storage_id + "/folder/" + req.params.folder_id);
                })
                .catch((error) => {
                    console.error("Error inserting file record:", error);
                    res.status(500).send("Internal Server Error");
                });
        });
    });
};
exports.deleteFileInFolder = (req, res) => {
    const fileId = req.body.fileId;

    // Fetch the file information from the database
    db('storage_folder_files')
        .where('id', fileId)
        .first()
        .then(file => {
            if (!file) {
                return res.status(404).send('File not found');
            }

            // Delete the file from the filesystem
            const filePath = path.join(__dirname, '../public/storage/folders', req.params.folder_id, file.file_name);
            fs.unlink(filePath, err => {
                if (err && err.code !== 'ENOENT') {
                    console.error('Error deleting file:', err);
                    return res.status(500).send('Error deleting file');
                }

                // Delete the file information from the database
                db('storage_folder_files')
                    .where('id', fileId)
                    .del()
                    .then(() => {
                        res.redirect('back');
                    })
                    .catch(err => {
                        console.error('Error deleting file information from the database:', err);
                        res.status(500).send('Error deleting file information from the database');
                    });
            });
        })
        .catch(err => {
            console.error('Error fetching file information from the database:', err);
            res.status(500).send('Error fetching file information from the database');
        });
};