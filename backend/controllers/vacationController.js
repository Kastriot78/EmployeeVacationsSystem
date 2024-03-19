import Vacation from '../Models/Vacation.js';
import User from '../Models/User.js';
import {
    sendEmailToAdmin
} from '../utils/sendEmail.js';

export const createVacation = async (req, res) => {
    const {
        dates,
        comment,
        userId
    } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                error: "User not found"
            });
        }

        const totalVacations = await Vacation.find({
            user: user._id,
            status: 'Approved'
        });
        const totalVacationDays = totalVacations.reduce((total, vacation) => total + vacation.dates.length, 0);
        console.log(totalVacationDays);
        // Check if the new vacation exceeds the maximum allowed days (18 in this case)
        if (totalVacationDays + dates.length > 18) {
            return res.status(400).json({
                error: "You have exceeded the maximum allowed vacation days (18 days)"
            });
        }

        // Check if any existing vacations for the user have the same dates
        const existingVacations = await Vacation.find({
            user: user._id,
            dates: {
                $in: dates
            }
        });


        if (existingVacations.length > 0) {
            return res.status(400).json({
                error: "Vacation with duplicate date(s) already exists"
            });
        }

        const newVacation = new Vacation({
            user: user,
            dates: dates,
            comment: comment
        });

        await newVacation.save();
        sendEmailToAdmin(user, newVacation); // Send email to admin when a vacation is created.
        res.status(200).json({
            vacation: newVacation,
            success: true,
            message: 'Vacation created successfully'
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
}

export const getUserVacationHistory = async (req, res) => {
    const userId = req.params.userId;

    try {
        const userVacations = await Vacation.find({
            user: userId,
        }).sort({
            _id: -1
        });

        res.status(200).json({
            vacations: userVacations,
            success: true
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
}

export const getUserApprovedVacationHistory = async (req, res) => {
    const userId = req.params.userId;

    try {
        const userVacations = await Vacation.find({
            user: userId,
            status: 'Approved'
        }).sort({
            _id: -1
        });

        res.status(200).json({
            vacations: userVacations,
            success: true
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
}

// When querying for vacation documents, we can populate the user field to retrieve the entire user object:
// const vacations = await Vacation.find().populate('user');

// Get all vacations with status "Pending" and populate the user information
export const getApprovedVacationsWithUserInfo = async (req, res) => {
    try {
        const pendingVacations = await Vacation.find({
                status: 'Approved'
            })
            .populate({
                path: 'user',
                select: 'name lastName email'
            });
        res.status(200).json(pendingVacations);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

// export const getAllVacations = async (req, res) => {
//     try {
//         const allVacations = await Vacation.find({}).sort({ _id: -1 })
//             .populate({
//                 path: 'user',
//                 select: 'name lastName email'
//             });
//         res.status(200).json(allVacations);
//     } catch (error) {
//         res.status(500).json({
//             error: error.message
//         });
//     }
// };

// Update vacation status by ID
export const updateVacationStatus = async (req, res) => {
    const {
        vacationId,
        newStatus
    } = req.body;

    try {
        const vacation = await Vacation.findById(vacationId);

        if (!vacation) {
            return res.status(404).send('No vacation found with that id.');
        }

        vacation.status = newStatus;
        await vacation.save();

        res.status(200).json({
            vacation,
            success: true,
            message: 'Vacation status updated successfully'
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
};

export const getUserVacationsHistoryByStatus = async (req, res) => {
    const {
        status
    } = req.params;

    try {
        let vacations;
        if (status === 'All') {
            vacations = await Vacation.find().sort({
                _id: -1
            }).populate({
                path: 'user',
                select: 'name lastName email'
            });
        } else {
            vacations = await Vacation.find({
                status: status
            }).sort({
                _id: -1
            }).populate({
                path: 'user',
                select: 'name lastName email'
            });
        }
        res.status(200).json(vacations);
    } catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    }
};

// Function to get the number of vacations for today
export const getVacationsForToday = async (req, res) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    try {
        const vacationsToday = await Vacation.countDocuments({
            dates: {
                $in: [today.toISOString()]
            }
        });
        res.status(200).json(vacationsToday);
    } catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    }
};

// Function to get the number of vacations for the current week
export const getVacationsForWeek = async (req, res) => {
    const today = new Date(); // Get today's date
    const firstDayOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
    const lastDayOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + (6 - today.getDay()));
    firstDayOfWeek.setHours(0, 0, 0, 0);
    lastDayOfWeek.setHours(23, 59, 59, 999);

    try {
        const vacationsThisWeek = await Vacation.countDocuments({
            dates: {
                $gte: firstDayOfWeek.toISOString(),
                $lte: lastDayOfWeek.toISOString()
            }
        });

        res.status(200).json(vacationsThisWeek);
    } catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    }
};

// User can delete vacation only if status is pending
export const deleteVacation = async (req, res) => {
    const userId = req.user._id;
    const {
        vacationId
    } = req.params;

    try {
        const vacation = await Vacation.findOne({
            _id: vacationId,
            user: userId,
            status: 'Pending'
        });

        if (!vacation) {
            return res.status(404).json({
                error: 'Vacation not found or cannot be deleted'
            });
        }

        await Vacation.deleteOne({
            _id: vacationId
        });

        res.status(200).json({
            success: true,
            message: 'Vacation request deleted successfully'
        })
    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
}

export const getVacactionsForEveryMonth = async (req, res) => {
    try {
        const vacations = await Vacation.find({
            status: 'Approved'
        });

        const monthsData = {
            Jan: [],
            Feb: [],
            Mar: [],
            Apr: [],
            May: [],
            Jun: [],
            Jul: [],
            Aug: [],
            Sep: [],
            Oct: [],
            Nov: [],
            Dec: [],
        };

        // Process vacations and organize them by month
        vacations.forEach(vacation => {
            vacation.dates.forEach(date => {
                const month = new Date(date).toLocaleString('default', {
                    month: 'short'
                });
                if (monthsData[month]) {
                    monthsData[month].push(vacation);
                }
            });
        });

        // Prepare chart data from the organized months data
        const chartData = Object.keys(monthsData).map(month => ({
            name: month,
            data: monthsData[month].length,
        }));

        res.status(200).json(chartData);
    } catch (error) {
        console.error('Error getting vacations by month:', error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
}
